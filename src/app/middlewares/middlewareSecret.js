export default async function (req, res, next)
{
    const apiSecret = req.headers['api-secret'];

    if (apiSecret === '' || apiSecret === undefined || apiSecret !== process.env.API_SECRET) {
        return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
    }
    return next();
}
