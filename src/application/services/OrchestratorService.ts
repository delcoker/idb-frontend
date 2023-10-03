import Manager from "../../domain/models/Manager";

export default interface OrchestratorService {
    getManagers(): Promise<Manager[]>
}