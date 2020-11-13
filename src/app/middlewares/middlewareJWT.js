import jwt from 'jsonwebtoken';

import { promisify } from 'util';
import authConfig from '../../config/auth';

import ModelLogErrors from '../models/LogErrors';

export default async function (req, res, next)
{
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
  }
  try {
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret);

    req.UUID = decoded.params.uuid === undefined ? '' : decoded.params.uuid;

    return next();
  } catch (error) {
    await ModelLogErrors.create({ uuid: '', params: '', error: error.stack });
    return res.status(401).json({ status: false, message: 'Token expired.' });
  }
}
