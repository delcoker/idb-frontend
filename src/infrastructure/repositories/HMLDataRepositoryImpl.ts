import axios from "axios";
import HMLDataRepository from "../../domain/repositories/HMLDataRepository";

export default class HMLDataRepositoryImpl implements HMLDataRepository {
    uri = 'https://static.hungermapdata.org/insight-reports/latest/country.json';

    async getAlertData() {
        try {
            const response = await axios.get(this.uri, {params: {}});
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving alert data: ${error}`);
        }
    }
}