import { validate as uuidValidate } from 'uuid';

import Redis from '../../lib/Redis';
import ModelLogErrors from '../models/LogErrors';
import ModelFinishJobs from '../models/FinishedJobs';

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

    const qtdFinishJobs = await ModelFinishJobs.findAll({ where: { uuid } });

    if (qtdFinishJobs.length < 5) {

      const length = qtdFinishJobs.length;
      const total = parseInt(5 - length);

      if (total === 1) {
        var message = 'Ainda resta 1 job a ser finalizado';
      } else {
        var message = `Ainda restam ${total} jobs a serem finalizados.`
      }
      return res.status(400).json({ status: false, message });
    }

    return next();
  } catch (error) {
    await ModelLogErrors.create({ uuid, params: '', error: error.stack });
    return res.status(401).json({ status: false, message: 'Get out.' });
  }
}
