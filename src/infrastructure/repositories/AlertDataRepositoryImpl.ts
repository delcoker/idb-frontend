import AlertDataRepository from "../../domain/repositories/AlertDataRepository";
import axios from "axios";

export default class AlertDataRepositoryImpl implements AlertDataRepository {
    uri = 'https://6ro4cvq3sc.execute-api.eu-central-1.amazonaws.com/default/get_daily_alert';
    // uri = 'https://static.hungermapdata.org/insight-reports/latest/country.json';

    async getAlertData() {
        try {
            const response = await axios.get(this.uri, {params: {}});
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving alert data: ${error}`);
        }
    }
}