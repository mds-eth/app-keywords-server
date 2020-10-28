import UserService from '../service/UserService';

class UserController
{

    async getDetailUser(req, res)
    {

        const { UUID } = req;

        const response = await UserService.getUser(UUID);

        if (!response) {
            return res.status(400).json({ status: false, message: UserService.message });
        }
        return res.status(200).json({ status: true, response });
    }

    async updateUser(req, res)
    {
        const { file, UUID } = req;

        const { name, email, company, phone } = req.body;

        const response = await UserService.updateUser(UUID, file.filename, name, email, company, phone);

        if (!response) {
            return res.status(400).json({ status: false, message: UserService.message });
        }
        return res.status(200).json({ status: true, response });
    }
}

export default new UserController();