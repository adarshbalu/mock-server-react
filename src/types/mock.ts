import RequestType from "./request_type";

export default interface Mock {
    id?: string;
    name: string;
    requests: RequestType[];
}