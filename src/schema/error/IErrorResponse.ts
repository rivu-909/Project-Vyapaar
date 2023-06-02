import ErrorType from "./ErrorType";
import Status from "../response/Status";

interface IErrorResponse {
    description?: string;
    status?: Status;
    errorType?: ErrorType;
    statusCode?: number;
    data?: any;
}

export default IErrorResponse;
