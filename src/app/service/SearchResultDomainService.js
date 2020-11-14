import ModelApiForSeo from '../models/ApiForSeo';

import Sequelize from 'sequelize';

import Redis from '../../lib/Redis';

import JobService from '../service/JobService';
import ModelLogErrors from '../models/LogErrors';
import ModelFinishJobs from '../models/FinishedJobs';
import ApiMozService from '../service/ApiMozService';
import DataSeoService from '../service/DataForSeoService';
import PerformanceUrlService from './PerformanceUrlService';
import AlexaRankResultService from './AlexaRankResultService';
import GoogleIndexPagesService from './GoogleIndexPagesService';

class SearchResultDomainService
{
    async getResultUUID(uuid)
    {
        try {

            const qtdFinishJobs = await ModelFinishJobs.findAll({ where: { uuid } });

            if (!qtdFinishJobs) return false;

            const keywords = await JobService.getKeywordsUUID(uuid);

            return this.createArrayKwyrods(qtdFinishJobs.length, keywords, uuid);
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }

    async createArrayKwyrods(length, keywords, uuid)
    {
        try {

            switch (length) {
                case 0:
                    return {
                        keywords,
                        apiDataForSeo: false,
                        googlePages: false,
                        responseMoz: false,
                        performanceURLS: false,
                        alexaResult: false
                    };
                case 1:

                    const apiDataForSeo = await DataSeoService.getParamsDataSeo(uuid);

                    await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(apiDataForSeo));

                    return {
                        keywords,
                        apiDataForSeo,
                        googlePages: false,
                        responseMoz: false,
                        performanceURLS: false,
                        alexaResult: false
                    };
                case 2:
                    const dataSeo = await DataSeoService.getParamsDataSeo(uuid);

                    await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(dataSeo));

                    const responseMoz = await ApiMozService.getResultMozUUID(uuid);

                    await Redis.addCacheRedis(`responseMoz-${uuid}`, JSON.stringify(responseMoz));

                    return {
                        keywords,
                        apiDataForSeo: dataSeo,
                        googlePages: false,
                        responseMoz,
                        performanceURLS: false,
                        alexaResult: false
                    };
                case 3:

                    const cacheAlexa = await Redis.getCacheById(`alexaResult-${uuid}`);

                    if (!cacheAlexa) {
                        var alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);

                        await Redis.addCacheRedis(`alexaResult-${uuid}`, JSON.stringify(alexaResult));
                    }

                    return {
                        keywords,
                        apiDataForSeo: await Redis.getCacheById(`apiDataSeo-${uuid}`),
                        googlePages: await Redis.getCacheById(`indexPages-${uuid}`),
                        responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
                        performanceURLS: false,
                        alexaResult: cacheAlexa ? cacheAlexa : alexaResult
                    };
                case 4:
                    const cache = await Redis.getCacheById(`indexPages-${uuid}`);

                    if (!cache) {
                        var resultPages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
                        await Redis.addCacheRedis(`indexPages-${uuid}`, JSON.stringify(resultPages));
                    }

                    return {
                        keywords,
                        apiDataForSeo: await Redis.getCacheById(`apiDataSeo-${uuid}`),
                        googlePages: cache ? cache : resultPages,
                        responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
                        performanceURLS: false,
                        alexaResult: await Redis.getCacheById(`alexaResult-${uuid}`)
                    };
                case 5:

                    const apiDataSeo = await Redis.getCacheById(`apiDataSeo-${uuid}`);

                    const data = {
                        keywords,
                        apiDataForSeo: apiDataSeo,
                        googlePages: await Redis.getCacheById(`indexPages-${uuid}`),
                        responseMoz: await Redis.getCacheById(`responseMoz-${uuid}`),
                        performanceURLS: await PerformanceUrlService.getPerformanceURLSUUID(uuid),
                        alexaResult: await Redis.getCacheById(`alexaResult-${uuid}`)
                    };
                    await Redis.addCacheRedis(uuid, JSON.stringify(data));

                    return data;
            }
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }

    async getLastSearchsUser(uuid_user)
    {
        try {

            let response = await ModelApiForSeo.findAll({
                where: { uuid_user },
                attributes: [
                    Sequelize.fn('DISTINCT', Sequelize.col('uuid')), 'uuid'
                ],
            });

            if (!response) return false;

            response.reverse();

            const array = [];
            for (var i in response) {
                const uuid = response[i];

                const data = await JobService.getRegisterKeyword(uuid.uuid);

                if (!data) continue;

                const { createdAt: created_at } = data;
                const { word1, word2 } = data.params;

                array.push([uuid.uuid, `[${word1} / ${word2}]`, created_at]);
            }
            return array;
        } catch (error) {
            console.log(error);
        }
    }

    async getDetailRegister(uuid)
    {

        const apiDataForSeo = await ModelApiForSeo.findAll({
            where: { uuid },
            attributes: ['type', 'rank_group', 'rank_absolute', 'position', 'domain', 'created_at'],
        });

        const data = {
            keywords: await JobService.getKeywordsUUID(uuid),
            apiDataForSeo: apiDataForSeo,
            googlePages: await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid),
            responseMoz: await ApiMozService.getResultMozUUID(uuid),
            performanceURLS: await PerformanceUrlService.getPerformanceURLSUUID(uuid),
            alexaResult: await AlexaRankResultService.getResultAlexaRankgUUID(uuid)
        };

        await Redis.addCacheRedis(uuid, JSON.stringify(data));

        return data;
    }
}

export default new SearchResultDomainService();
