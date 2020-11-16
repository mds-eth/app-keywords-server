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

            return this.createArrayKeywords(qtdFinishJobs.length, keywords, uuid);
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }

    async createArrayKeywords(length, keywords, uuid)
    {
        try {

            if (length === 0) {
                return await this.returnArrayParams(keywords, false, false, false, false, false, false);
            } else if (length === 1) {

                const apiDataForSeo = await DataSeoService.getParamsDataSeo(uuid);
                await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(apiDataForSeo));

                return await this.returnArrayParams(keywords, apiDataForSeo, false, false, false, false, false);

            } else if (length === 2) {

                let apiDataForSeo = await Redis.getCacheById(`apiDataSeo-${uuid}`);

                if (apiDataForSeo === null) {
                    apiDataForSeo = await DataSeoService.getParamsDataSeo(uuid);
                    await Redis.addCacheRedis(`apiDataSeo-${uuid}`, JSON.stringify(apiDataForSeo));
                }
                const responseMoz = await ApiMozService.getResultMozUUID(uuid);

                await Redis.addCacheRedis(`responseMoz-${uuid}`, JSON.stringify(responseMoz));

                return await this.returnArrayParams(keywords, apiDataForSeo, false, responseMoz, false, false, false);

            } else if (length === 3) {

                const alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);
                await Redis.addCacheRedis(`alexaResult-${uuid}`, JSON.stringify(alexaResult));

                const apiDataForSeo = await Redis.getCacheById(`apiDataSeo-${uuid}`);
                const responseMoz = await Redis.getCacheById(`responseMoz-${uuid}`);

                return await this.returnArrayParams(keywords, apiDataForSeo, false, responseMoz, false, alexaResult, false);

            } else if (length === 4) {

                const googlePages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
                await Redis.addCacheRedis(`indexPages-${uuid}`, JSON.stringify(googlePages));

                const apiDataForSeo = await Redis.getCacheById(`apiDataSeo-${uuid}`);
                let alexaResult = await Redis.getCacheById(`alexaResult-${uuid}`);

                if (alexaResult === null) {
                    alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);
                    await Redis.addCacheRedis(`alexaResult-${uuid}`, JSON.stringify(alexaResult));
                }
                const responseMoz = await Redis.getCacheById(`responseMoz-${uuid}`);

                return await this.returnArrayParams(keywords, apiDataForSeo, googlePages, responseMoz, false, alexaResult, false);

            } else if (length === 5) {

                const apiDataForSeo = await Redis.getCacheById(`apiDataSeo-${uuid}`);
                const alexaResult = await Redis.getCacheById(`alexaResult-${uuid}`);
                const googlePages = await Redis.getCacheById(`indexPages-${uuid}`);
                const responseMoz = await Redis.getCacheById(`responseMoz-${uuid}`);
                const performanceURLS = await PerformanceUrlService.getPerformanceURLSUUID(uuid);

                const quadrant = await this.createQuadrant(apiDataForSeo, googlePages, responseMoz, performanceURLS);

                const data = await this.returnArrayParams(keywords, apiDataForSeo, googlePages, responseMoz, performanceURLS, alexaResult, quadrant);

                await Redis.addCacheRedis(uuid, JSON.stringify(data));

                return data;
            }
        } catch (error) {
            await ModelLogErrors.create({ uuid, params: '', error: error.stack });
            return false;
        }
    }

    async returnArrayParams(keywords, apiDataForSeo, googlePages, responseMoz, performanceURLS, alexaResult, quadrant)
    {
        return { keywords, apiDataForSeo, googlePages, responseMoz, performanceURLS, alexaResult, quadrant };
    }

    async createQuadrant(apiDataForSeo, googlePages, responseMoz, performanceURLS)
    {
        return true;
    }

    async getLastSearchsUser(uuid_user)
    {

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
    }

    async getDetailRegister(uuid)
    {

        const apiDataForSeo = await DataSeoService.getParamsDataSeo(uuid);
        const googlePages = await GoogleIndexPagesService.getGoogleIndexPagesUUID(uuid);
        const responseMoz = await ApiMozService.getResultMozUUID(uuid);
        const performanceURLS = await PerformanceUrlService.getPerformanceURLSUUID(uuid);
        const alexaResult = await AlexaRankResultService.getResultAlexaRankgUUID(uuid);

        const data = {
            keywords: await JobService.getKeywordsUUID(uuid),
            apiDataForSeo,
            googlePages,
            responseMoz,
            performanceURLS,
            alexaResult,
            quadrant: await this.createQuadrant(apiDataForSeo, googlePages, responseMoz, performanceURLS)
        };

        await Redis.addCacheRedis(uuid, JSON.stringify(data));

        return data;
    }
}

export default new SearchResultDomainService();
