import AuthRepository from "../../domain/repositories/AuthRepository";
import ApiClientImpl from "../utils/ApiClientImpl";


class AuthRepositoryImpl implements AuthRepository {
    constructor(readonly apiClient: ApiClientImpl) {
    }

    async login(payload: { email: string; password: string }): Promise<null | string> {
        const token = (payload.email === 'only@employee.com') || (payload.email === 'only@employee2.com') ? '123' : null;
        if (token) {
            this.apiClient.updateHeaders({
                Authorization: `Bearer ${token}`,
            });
            localStorage.setItem('token', token);
            localStorage.setItem('email', payload.email)
        }
        return token;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('token');
        localStorage.clear();
        this.apiClient.updateHeaders({});
    }
}

export default AuthRepositoryImpl;
