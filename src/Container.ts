// import AnalyticsServiceImpl from "./domain/services/AnalyticsServiceImpl";
// import HighchartsFormatterImpl from "highcharts-library/lib/domain/formatters/HighchartsFormatterImpl";
// import HighchartsFactoryImpl from "highcharts-library/lib/domain/factories/HighchartsFactoryImpl";
// import AnalyticsRepositoryImpl from "./infrastructure/repositories/AnalyticsRepositoryImpl";
// import DateFormatterServiceImpl from "./domain/services/DateFormatterServiceImpl";
// import CurrencyFormatterServiceImpl from "./domain/services/CurrencyFormatterServiceImpl";
// import AuthRepository from "./domain/repositories/AuthRepository";
// import AuthRepositoryImpl from "./infrastructure/repositories/AuthRepositoryImpl";
// import EmployeeRepository from "./domain/repositories/EmployeeRepository";
// import ItemCategoryRepository from "./domain/repositories/ItemCategoryRepository";
// import ItemRepository from "./domain/repositories/ItemRepository";
// import PaymentMethodRepository from "./domain/repositories/PaymentMethodRepository";
// import ItemCategoryRepositoryImpl from "./infrastructure/repositories/ItemCategoryRepositoryImpl";
// import ItemRepositoryImpl from "./infrastructure/repositories/ItemRepositoryImpl";
// import PaymentMethodRepositoryImpl from "./infrastructure/repositories/PaymentMethodRepositoryImpl";
// import ReportRepository from "./domain/repositories/ReportRepository";
// import ReportRepositoryImpl from "./infrastructure/repositories/ReportRepositoryImpl";
// import SaleRepository from "./domain/repositories/SaleRepository";
// import SaleRepositoryImpl from "./infrastructure/repositories/SaleRepositoryImpl";
// import TaxRepository from "./domain/repositories/TaxRepository";
// import TaxRepositoryImpl from "./infrastructure/repositories/TaxRepositoryImpl";
// import UserRepository from "./domain/repositories/UserRepository";
// import UserRepositoryImpl from "./infrastructure/repositories/UserRepositoryImpl";
// import MenuRepository from "./domain/repositories/MenuRepository";
// import MenuRepositoryImpl from "./infrastructure/repositories/MenuRepositoryImpl";
// import EmployeeRepositoryImpl from "./infrastructure/repositories/EmployeeRepositoryImpl";
// import SaleContextImpl from "./domain/strategies/SaleContextImpl";
// import SaleServiceImpl from "./application/services/OrchestratorServiceImpl";
// import PrintServiceNewTaxImpl from "./domain/services/PrintServiceNewTaxImpl";
// import TaxServiceImpl from "./domain/services/TaxServiceImpl";

import AuthRepositoryImpl from "./infrastructure/repositories/AuthRepositoryImpl";
import ApiClientImpl from "./infrastructure/utils/ApiClientImpl";
import EmployeeRepositoryImpl from "./infrastructure/repositories/EmployeeRepositoryImpl";
import OrchestratorServiceImpl from "./application/services/OrchestratorServiceImpl";
import AlertDataRepositoryImpl from "./infrastructure/repositories/AlertDataRepositoryImpl";
import HMLDataRepositoryImpl from "./infrastructure/repositories/HMLDataRepositoryImpl";

class Container {
    private dependencies: { [key: string]: any } = {};

    register<T>(key: string, dependency: T) {
        this.dependencies[key] = dependency;
    }

    resolve<T>(key: string): T {
        if (this.dependencies.hasOwnProperty(key)) {
            return this.dependencies[key];
        } else {
            throw new Error(`Dependency '${key}' is not registered.`);
        }
    }
}

const idbEndpoint = process.env.NODE_ENV === "development" ?
    process.env.REACT_APP_DEV_IDB_BACKEND_API_URL :
    process.env.REACT_APP_USE_PROD_DOCKER_BACKEND === "true" ?
        process.env.REACT_APP_PROD_DOCKER_BACKEND_API_URL :
        process.env.REACT_APP_PROD_IDB_BACKEND_API_URL

console.log(idbEndpoint)
console.log(process.env.NODE_ENV)

// Create an instance of the container
const container = new Container();
const taxType = "new";

// Register dependencies

// INFO Repositories
container.register('IdbApiClient', new ApiClientImpl(idbEndpoint));
container.register('AuthRepository', new AuthRepositoryImpl(container.resolve('IdbApiClient')));
container.register('EmployeeRepository', new EmployeeRepositoryImpl(container.resolve('IdbApiClient')));
container.register('OrchestratorService', new OrchestratorServiceImpl(container.resolve('EmployeeRepository')));
container.register('AlertDataRepository', new AlertDataRepositoryImpl());
container.register('HMLDataRepository', new HMLDataRepositoryImpl());
// container.register('ReportRepository', new ReportRepositoryImpl());
// container.register('SaleRepository', new SaleRepositoryImpl());
// container.register('TaxRepository', new TaxRepositoryImpl());
// container.register('UserRepository', new UserRepositoryImpl());
// container.register('AnalyticsRepository', new AnalyticsRepositoryImpl());
// container.register('MenuRepository', new MenuRepositoryImpl());
// container.register('TaxService', new TaxServiceImpl(taxType));
//
// container.register('CurrencyFormatterService', new CurrencyFormatterServiceImpl());
// container.register('DateFormatterService', new DateFormatterServiceImpl());
//
// container.register('PrintService', new PrintServiceNewTaxImpl(container.resolve('CurrencyFormatterService'),
//   container.resolve('DateFormatterService'), container.resolve('TaxService')));
//
// container.register('HighchartsFormatter', new HighchartsFormatterImpl());
// container.register('HighchartsFactory', new HighchartsFactoryImpl(container.resolve('HighchartsFormatter')));
// container.register('AnalyticsService', new AnalyticsServiceImpl(
//   container.resolve('HighchartsFormatter'),
//   container.resolve('HighchartsFactory'),
//   container.resolve('AnalyticsRepository')
// ));
//
// container.register('SaleContext', new SaleContextImpl(container.resolve('SaleRepository'), container.resolve('PrintService')));
//
//
// container.register('OrchestratorService', new SaleServiceImpl(container.resolve('SaleContext'), taxType));


export default container;
