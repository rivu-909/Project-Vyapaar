import { AxiosError } from "axios";
import IError from "../schema/IError";

interface ErrorData {
    description: string;
    statusCode: number;
    data: Array<any>;
}

export default function createError(err: AxiosError): IError {
    const res = err.response?.data as ErrorData;
    const error: IError = {
        description: res?.description ?? "Some Error Occurred",
        validationError: !!res?.data,
        validationPath: res?.data[0].path ?? null,
    };
    return error;
}
