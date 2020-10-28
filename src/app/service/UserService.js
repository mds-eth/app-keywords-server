import ModelUser from '../models/Users';

class UserService
{
    constructor()
    {
        this.message = '';
    }

    async getUser(uuid)
    {
        const response = await ModelUser.findOne({
            where: { uuid },
            attributes: ['id', 'name', 'email', 'phone', 'company', 'url_avatar']
        });

        if (!response) return await this.messageError('Dados de usuário não localizados.');

        return response;
    }

    async updateUser(uuid, url_avatar, name, email, company, phone)
    {
        try {

            const response = await ModelUser.update({
                name, email, phone, company, url_avatar
            },
                { where: { uuid } });

            if (!response) return await this.messageError('Erro ao atualizar suas informações');

            return { uuid, url_avatar, name, email, company, phone };

        } catch (error) {

        }
    }

    async messageError(message)
    {
        this.message = message;

        return false;
    }
}

export default new UserService();