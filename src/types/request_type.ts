

export default interface RequestType {
    id?: number;
    status: number;
    method: string;
    params: {},
    endPoint: string,
    response: {} | string | number | boolean
}