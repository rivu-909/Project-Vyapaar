import Address from "../Address";

export default interface IConnectionDailog {
    visible: boolean;
    userName: string | null;
    phoneNumber: string | null;
    address: Address | null;
}
