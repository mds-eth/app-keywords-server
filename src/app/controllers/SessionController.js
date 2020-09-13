import SessionService from '../service/SessionService';

class SessionController
{
  async createToken(req, res)
  {
    const response = await SessionService.generateToken();

    if (!SessionService.status) {
      return res.status(400).json({ status: false, message: 'We were unable to generate your token.' });
    }
    return res.status(200).json({ status: true, token: response, created_at: new Date() });
  }
}

export default new SessionController();
