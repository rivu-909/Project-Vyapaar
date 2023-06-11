import IProductDailogConfig from "./IproductDailogConfig";
import IRequestConfirmDailogConfig from "./IRequestConfiirmDailogConfig";
import ITradeDailogConfig from "./ITradeDailogConfig";

export default interface AppConfigState {
    tradeDailog: ITradeDailogConfig;
    productDailog: IProductDailogConfig;
    requestConfiirmDailog: IRequestConfirmDailogConfig;
}
