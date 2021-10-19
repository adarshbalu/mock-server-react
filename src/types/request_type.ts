

export default interface RequestType {
    id?: number;
    status: number;
    method: string;
    params: {};
    body: string;
    endPoint: string;
    response: {} | string | number | boolean;
}