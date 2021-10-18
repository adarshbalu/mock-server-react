

export default interface RequestType {
    id?: number;
    status: number;
    method: string;
    params: {},
    response: {} | string | number | boolean
}