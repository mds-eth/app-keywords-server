import ModelLogRequests from '../models/LogRequests';

export default async function (req, res, next)
{

    const url = req.url;
    const body = req.body;
    const method = req.method;
    const headers = req.headers;
    const rawHeaders = req.rawHeaders;

    await ModelLogRequests.create({ method, url, body, headers, raw_headers: rawHeaders });
    return next();
}