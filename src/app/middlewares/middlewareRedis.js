import { validate as uuidValidate } from 'uuid';

import Redis from '../../lib/Redis';

export default async function (req, res, next) {
  try {
    const { uuid } = req.params;

    if (uuid === '' || !uuidValidate(uuid)) {
      return res.status(400).json({ status: false, message: 'UUID invalid.' });
    }

    const response = await Redis.getCacheById(uuid);

    if (response) {
      return res.status(200).json({ status: true, uuid, response });
    }
    return next();
  } catch (error) {}
}
