import LoginService from '../service/LoginService';

class LoginController
{
    async login(req, res)
    {       
        const { email, password } = req.body;

        const response = await LoginService.findUser(email, password);

        if (!response) {
            return res.status(400).json({ status: false, message: 'Erro ao realizar seu login pelo linkedin.' });
        }
        return res.status(200).json({ status: true, response });
    }

    async createNewAccount(req, res)
    {
        const { name, email, password, } = req.body;

        if (name === '' || email === '' || password === '') {
            return res.status(400).json({ status: false, message: 'Dados de entrada inválidos.' });
        }

        const response = await LoginService.createNewAccountUser(name, email, password);

        if (!response) {
            return res.status(400).json({ status: false, message: LoginService.message });
        }
        return res.status(201).json({ status: true, response });
    }

    async loginLinkedin(req, res)
    {
        const data = req.body;

        const response = await LoginService.requestTokenOAuth2Linkedin(data);

        if (!response) {
            return res.status(400).json({ status: false, message: 'Erro ao realizar seu login pelo linkedin.' });
        }
        return res.status(200).json({ status: true, response });
    }

    async recoverPassword(req, res)
    {
        const { email } = req.body;

        if (email === '') {
            return res.status(400).json({ status: false, message: 'Campo inválido.' });
        }

        const response = await LoginService.recoverPasswordUser(email);

        if (!response) {
            return res.status(400).json({ status: false, message: LoginService.message });
        }
        return res.status(201).json({ status: true, response });
    }
}

export default new LoginController();