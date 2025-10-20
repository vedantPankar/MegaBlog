import { Account, Client, ID } from "appwrite"
import conf from "../conf/conf"

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.endpoint_url).setProject(conf.project_id)
        this.account = new Account(this.client)
    }

    async createUser({email, password, name}) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(user) {
                return this.login({email, password})
            }
            return user
        } catch (error) {
            console.error(error);
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession    (
                email,
                password
            )
        } catch (error) {
            console.error(error);
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.error(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }
}

const authService = new AuthService()

export default authService