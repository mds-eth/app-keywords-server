import BlackList from '../../helpers/Blacklist';

import ModelLogErrors from '../models/LogErrors';

export default async function (req, res, next)
{
    try {

        if (process.env.NODE_ENV === 'development') return next();

        const qtdAccessIP = await BlackList.queryBlackListIps(req.headers);

        if (!qtdAccessIP) {
            return res.status(401).json({ status: false, message: 'Not authorized.' });
        }

        const qtdNotFounds = await BlackList.queryQuantityNotFounds(req.headers);

        if (!qtdNotFounds) {
            return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
        }

        return next();
    } catch (error) {
        await ModelLogErrors.create({ uuid: '', params: '', error: error.stack });
        return res.status(401).json({ status: false, message: 'Full authentication is required to access this resource.' });
    }
}