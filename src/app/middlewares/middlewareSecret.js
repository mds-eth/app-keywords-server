export default async function (req, res, next)
{
  const apiSecret = req.headers['api-secret'];

  if (apiSecret === '' || apiSecret === undefined || apiSecret !== process.env.API_SECRET) {
    return res.status(401).json({ status: false, message: 'Acesso negado.' });
  }
  return next();
}
