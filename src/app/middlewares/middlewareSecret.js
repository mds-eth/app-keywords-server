export default async function (req, res, next) {
  try {
    const apiSecret = req.headers['api-secret'];

    if (apiSecret === '' || apiSecret === undefined || apiSecret !== process.env.API_SECRET) {
      return res.status(401).json({ status: false, message: 'Acesso negado.' });
    }
    next();
  } catch (error) {
    return res.status(400).json({ status: false, message: 'Erro interno.' });
  }
}
