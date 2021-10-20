export default class URL {
    static BASE_URL: string = "http://localhost:5000";

    static API_BASE_URL: string = "http://localhost:3101/api";

    static MOCK_ENDPOINT: string = "/mocks";
    static MOCK_PATH: string = URL.BASE_URL + URL.MOCK_ENDPOINT;

    static REQUEST_ENDPOINT: string = "/requests";
    static REQUEST_PATH: string = URL.BASE_URL + URL.REQUEST_ENDPOINT;
}