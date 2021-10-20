

export default interface RequestType {
    id?: number;
    status: number;
    method: string;
    params: {};
    body: string;
    endPoint: string;
    mockName: string;
    response: {} | string | number | boolean;
}