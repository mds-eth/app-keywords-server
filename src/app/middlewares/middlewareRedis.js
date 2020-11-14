import { validate as uuidValidate } from 'uuid';

import Redis from '../../lib/Redis';
import ModelLogErrors from '../models/LogErrors';

export default async function (req, res, next)
{
    const { uuid } = req.params;

    try {

        if (uuid === '' || !uuidValidate(uuid)) {
            return res.status(400).json({ status: false, message: 'UUID invalid.' });
        }

        const response = await Redis.getCacheById(uuid);

        if (response) {
            return res.status(200).json({ status: true, uuid, response });
        }
        return next();
    } catch (error) {
        await ModelLogErrors.create({ uuid, params: '', error: error.stack });
        return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
    }
}
