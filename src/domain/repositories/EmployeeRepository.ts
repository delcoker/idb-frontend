import Employee from "../models/Employee";
import Manager from "../models/Manager";

export default interface EmployeeRepository {
    getLoginEmployees(): Promise<Employee[]>;
    getAdmin(): Manager;

    getDummyManagers(): Manager[];

    updateManager(employeeDetails:Manager) : Manager;
    updateAdmin(employeeDetails:Manager): Manager;

    getAllApiManagers(): Promise<[]>;
}