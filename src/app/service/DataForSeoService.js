import { v4 as uuidv4 } from 'uuid';

import { encode } from 'js-base64';
import isValidDomain from 'is-valid-domain';

import utf8 from 'utf8';

import Queue from '../../lib/Queue';

import ModelLogErros from '../models/LogErrors';
import ModelApiForSeo from '../models/ApiForSeo';

import InsertApiDataSeo from '../../jobs/InsertApiDataSeo';

class DataForSeoService
{
    async createProcessQueueApis(uuid_user, word1, word2)
    {
        const uuid = uuidv4();

        try {

            var data = {
                uuid_user,
                uuid,
                word1,
                word2,
            };
            await Queue.add(InsertApiDataSeo.key, data);

            return uuid;
        } catch (error) {
            await ModelLogErros.create({ uuid, params: data, error: error.stack });
            return false;
        }
    }

    async returnArrayParams(word1, word2, site = '')
    {
        const data = [];
        const postArray = {
            language_name: 'Portuguese',
            location_code: 2076,
            location_name: 'Brazil',
            language_code: 'pt',
            depth: 15,
            keyword: site === '' ? utf8.encode(`${word1}+${word2}`) : `site: ${site}`,
        };

        data.push(postArray);

        return data;
    }

    async rankedKeywordService()
    {
        const { uuid } = values.data;

        const auth = await DataForSeoService.getAuthEncodeApiForSeo();
        const params = await DataForSeoService.returnArrayParams(word1, word2);

        const headers = {
            Authorization: `Basic ${auth}`,
        };

        const urlRequest = `${process.env.API_FOR_SEO}v3/dataforseo_labs/ranked_keywords/live`;

        try {

            const response = await BaseService.callAPI('POST', params, urlRequest, headers, uuid);

            if (response.status === 200) {
                const data = response.data;


            }
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: values, error: error.stack });
            return false;
        }
    }

    async getAuthEncodeApiForSeo()
    {
        try {

            const concat = `${process.env.LOGIN_API_FOR_SEO}:${process.env.PASS_API_FOR_SEO}`;

            const auth64 = encode(concat);

            return auth64;
        } catch (error) {
            await ModelLogErros.create({ uuid: '', params: '', error: error.stack });
            return false;
        }
    }

    async saveBDReturnApiForSeo(uuid_user, uuid, params)
    {
        try {

            const domains = [];

            const limitLoop = process.env.NODE_ENV === 'production' ? params.length : 2;

            for (var i = 0; i <= limitLoop; i++) {
                const search = params[i];

                if (search === undefined) continue;

                const domain = search.domain;

                if (isValidDomain(domain)) {

                    const existData = await ModelApiForSeo.findOne({ where: { uuid_user, uuid, domain } });

                    if (existData) continue;

                    const type = search.type;
                    const rank_group = search.rank_group;
                    const rank_absolute = search.rank_absolute;
                    const position = search.position;
                    const title = search.title;
                    const url = search.url;
                    const breadcrumb = search.breadcrumb === undefined ? '' : search.breadcrumb;
                    const description = search.description === undefined ? '' : search.description;
                    const links = search.links === undefined ? '' : search.links;
                    const faq = search.faq === undefined ? '' : search.faq;

                    await ModelApiForSeo.create({ uuid_user, uuid, type, rank_group, rank_absolute, position, domain, title, url, breadcrumb, description, links, faq, });
                    domains.push(domain);
                } else {
                    continue;
                }
            }

            return domains;
        } catch (error) {
            await ModelLogErros.create({ uuid, params, error: error.stack });
            return false;
        }
    }

    async getParamsDataSeo(uuid)
    {
        return await ModelApiForSeo.findAll({
            where: { uuid },
            attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain', 'created_at', 'updated_at'],
        });
    }
}

export default new DataForSeoService();
