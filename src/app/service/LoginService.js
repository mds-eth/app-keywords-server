import { v4 as uuidv4 } from 'uuid';
import queryString from 'querystring';

import BaseService from './BaseService';
import SessionService from './SessionService';

import ModelUsers from '../models/Users';
import ModelLogErrors from '../models/LogErrors';

import axios from 'axios';

class LoginService
{
    constructor()
    {
        this.message = '';
    }

    async requestTokenOAuth2Linkedin(params)
    {
        try {

            const response = await axios.post("https://www.linkedin.com/oauth/v2/accessToken", queryString.stringify(params));

            if (response.status === 200) {
                const { access_token } = response.data;

                return await this.requestDetailUser(access_token);
            }

            return false;
        } catch (error) {
            await ModelLogErrors.create({ uuid: '', params, error: error.stack });
            return false;
        }
    }


    async requestDetailUser(token)
    {
        try {

            const url = 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))';

            const response = await BaseService.callAPI('GET', '', url, { Authorization: `Bearer ${token}` }, '');

            if (response.status === 200) {

                const params = response.data;

                const id = params.id;
                const firstName = params.firstName.localized.pt_BR;
                const lastName = params.lastName.localized.pt_BR;
                const profilePicture = params.profilePicture;

                const urlPhoto = profilePicture['displayImage~'].elements[0].identifiers[0].identifier;

                const uuid = uuidv4();

                const user = await this.saveNewUser(uuid, `${firstName} ${lastName}`, '', 'admin', '', '', urlPhoto, true);

                if (!user) return false;

                const session = await SessionService.generateTokenFrontEnd({ uuid, firstName, });

                if (!session) return false;

                return {
                    name: firstName,
                    session,
                    admin: true,
                    image: urlPhoto
                };
            }
        } catch (error) {
            await ModelLogErrors.create({ uuid: '', params: token, error: error.stack });
            return false;
        }
    }


    async saveNewUser(uuid, name, email, password, phone, company, url_avatar, admin)
    {
        try {

            await ModelUsers.create({ uuid, name, email, phone, password, company, url_avatar, last_access: new Date(), admin });

            return true;
        } catch (error) {
            await ModelLogErrors.create({ uuid: '', params: { token, id }, error: error.stack });
            return false;
        }
    }

    async findUser(email, password)
    {
        try {

            const response = await ModelUsers.findOne({
                where: { email, password }
            });

            if (!response) return false;

            const session = await SessionService.generateTokenFrontEnd({ uuid: response.uuid, firstName: response.name, });

            if (!session) return false;

            const { id } = response;

            await ModelUsers.update({ last_access: new Date() }, { where: { id } });

            return {
                name: response.name,
                session,
                admin: response.admin,
                image: response.url_avatar
            };

        } catch (error) {
            await ModelLogErrors.create({ uuid: '', params: { email, password }, error: error.stack });
            return false;
        }
    }

    async createNewAccountUser(name, email, password)
    {
        try {

            const checkExists = await ModelUsers.findOne({
                where: { email }
            });

            if (checkExists) {
                return await this.messageError('Usuário já cadastrado com o email informado.');
            }

            const uuid = uuidv4();

            const response = await ModelUsers.create({ uuid, name, email, password, company: '', url_avatar: '', last_access: new Date(), admin: false });

            if (!response) return false;

            const session = await SessionService.generateTokenFrontEnd({ uuid, firstName: name });

            if (!session) return false;

            return {
                name: response.name,
                session,
                admin: false,
                image: ''
            };
        } catch (error) {

        }
    }

    async recoverPasswordUser(email)
    {
        try {

            const checkExists = await ModelUsers.findOne({
                where: { email }
            });

            if (!checkExists) {
                return await this.messageError('Usuário não localizado para o email informado.');
            }


        } catch (error) {

        }
    }

    async messageError(message)
    {
        this.message = message;

        return false;
    }
}

export default new LoginService();