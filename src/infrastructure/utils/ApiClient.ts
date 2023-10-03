import {AxiosInstance, AxiosResponse} from "axios";

export default interface ApiClient {

    updateHeaders(headers: any): void;

    getClient(): AxiosInstance;

    get(url: string, config?: any): Promise<AxiosResponse>;

    post(url: string, data?: any, config?: any): Promise<AxiosResponse>;

}