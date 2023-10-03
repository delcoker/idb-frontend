import OrchestratorService from "./OrchestratorService";
import Manager from "../../domain/models/Manager";
import EmployeeRepository from "../../domain/repositories/EmployeeRepository";


export default class OrchestratorServiceImpl implements OrchestratorService {

    constructor(readonly employeeRepository: EmployeeRepository) {
    }

    async getManagers(): Promise<Manager[]> {
        const dummyManagers = this.employeeRepository.getDummyManagers();

        const managersResponse = await this.employeeRepository.getAllApiManagers();

        const managers: Manager[] = managersResponse.map((apiManager: any) =>
            ({
                countryId: 45 * apiManager.id,
                id: apiManager.id,
                email: apiManager.email,
                userType: "MANAGER"
            }));

        return dummyManagers.concat(managers);
    }

}