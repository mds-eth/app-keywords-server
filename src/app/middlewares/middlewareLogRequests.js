import ModelLogErrors from '../models/LogErrors';
import ModelLogRequests from '../models/LogRequests';

export default async function (req, res, next)
{

  try {
    const url = req.url;
    const body = req.body;
    const method = req.method;
    const headers = req.headers;
    const raw_headers = req.rawHeaders;

    await ModelLogRequests.create({ method, url, body, headers, raw_headers });

    return next();
  } catch (error) {
    await ModelLogErrors.create({ uuid: '', params: '', error: error.stack });
    return res.status(401).json({ status: false, message: 'Get out.' });
  }
}