import { google } from 'googleapis';

class GoogleApis
{
  async callAPIGoogle(domains)
  {

    try {

      for (var i in domains) {

        const domain = domains[i];

        const params = {
          auth: process.env.API_KEY_GOOGLE,
          siteUrl: domain,
          resource: {
            startDate: '2020-09-07',
            endDate: '2020-09-07'
          }
        }

        const response = await google.webmasters('v3').searchanalytics.query(params);

        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

}

export default new GoogleApis();