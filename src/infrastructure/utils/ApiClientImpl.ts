import axios, {AxiosInstance, AxiosResponse} from "axios";
import ApiClient from "./ApiClient";

export default class ApiClientImpl implements ApiClient {
    private apiClient: AxiosInstance;
    private readonly hostname: string;

    public constructor(hostname: string = "") {
        this.hostname = hostname;
        this.apiClient = axios.create({
            baseURL: this.hostname,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem('token')
            },
        });
    }

    public updateHeaders(headers: any): void {
        this.apiClient = axios.create({
            baseURL: this.hostname,
            headers: {
                ...this.apiClient.defaults.headers.common,
                ...headers,
            },
        });
    }

    public getClient(): AxiosInstance {
        return this.apiClient;
    }

    public get(url: string, config?: any): Promise<AxiosResponse> {
        return this.apiClient.get(url, config);
    }

    public post(url: string, data?: any, config?: any): Promise<AxiosResponse> {
        return this.apiClient.post(url, data, config);
    }

}