import User from '../../domain/models/User';
import Employee from '../../domain/models/Employee';
import EmployeeRepository from "../../domain/repositories/EmployeeRepository";
import Manager from "../../domain/models/Manager";
import ApiClientImpl from "../utils/ApiClientImpl";


export default class EmployeeRepositoryImpl implements EmployeeRepository {

    private readonly employeeRoute: string;

    public constructor(readonly apiClient: ApiClientImpl) {
        this.employeeRoute = '/orchestrator/db';
        this.apiClient = apiClient
    }

    async getLoginEmployees(): Promise<Employee[]> {
        const user: User = {
            id: 1,
            email: "only@employee.com",
            firstname: "Only",
            lastname: 'Employee',
            username: 'onlyEmployee',
            password: '123',
            status: 'ENABLED',
            enabled: true,

        };
        const onlyEmployee: Employee = {
            id: 1,
            name: 'Only Employee', email: 'only@employee.com',
            deloop_user_id: '123',
            employeeId: '123',
            userDao: user
        };

        const user2: User = {
            id: 2,
            email: "only2@employee.com",
            firstname: "Only2",
            lastname: 'Employee2',
            username: 'onlyEmployee2',
            password: '123',
            status: 'ENABLED',
            enabled: true,
        };
        const onlyEmployee2: Employee = {
            id: 2,
            name: 'Only Employee2', email: 'only@employee2.com',
            deloop_user_id: '123',
            employeeId: '123',
            userDao: user2
        };

        return [onlyEmployee, onlyEmployee2]
    }

    getAdmin(): Manager {
        return {
            countryId: 0,
            id: 1,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

    getDummyManagers(): Manager[] {
        return [{
            countryId: 1,
            id: 999,
            email: 'another@admin.com',
            userType: "ADMIN"
        }, {
            countryId: 10,
            id: 100,
            email: 'delcoker+55@gmail.com',
            userType: "MANAGER"
        }, {
            countryId: 20,
            id: 200,
            email: 'another@gmail.com',
            userType: "MANAGER"
        }];
    }

    updateAdmin(): Manager {
        return {
            countryId: 434,
            id: 1,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

    updateManager(employeeDetails: Manager): Manager {
        return {
            id: 1,
            countryId: 5,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

    async getAllApiManagers() {
        try {
            const response = await this.apiClient.getClient().get(this.employeeRoute, {params: {}});
            return response.data;
        } catch (error) {
            throw new Error(`Error retrieving alert data: ${error}`);
        }
    }

}