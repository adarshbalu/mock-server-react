

export default interface RequestType {
    id?: string;
    status: number;
    method: string;
    params: {};
    body: {};
    endPoint: string;
    mockName: string;
    response: {} | string | number | boolean;
}