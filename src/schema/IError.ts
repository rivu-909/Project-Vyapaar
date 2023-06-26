export default interface IError {
    validationError: boolean;
    validationPath: string | null;
    description: string;
}
