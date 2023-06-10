import IProductDailogConfig from "./IproductDailogConfig";
import ITradeDailogConfig from "./ITradeDailogConfig";

export default interface AppConfigState {
    tradeDailog: ITradeDailogConfig;
    productDailog: IProductDailogConfig;
}
