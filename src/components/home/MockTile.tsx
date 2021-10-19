import { FunctionComponent, useContext, } from "react";
import { Link } from "react-router-dom";
import { RequestContext } from "../../contexts/requests_context";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";

interface MockTileProps {
    mock: Mock
}

const MockTile: FunctionComponent<MockTileProps> = (props: MockTileProps) => {
    const { request } = useContext(RequestContext);
    const mock = props.mock;

    const getAllRequests = (): Array<RequestType> => {

        const requestsList: RequestType[] = [];
        request.forEach((r) => {
            if (mock.requests.includes(r.id!)) {
                requestsList.push(r);
            }


        });

        return requestsList;
        // const data = request.find((r) => {
        //     return mock.requests.find((m) => { return r.id === m; });
        // }) as RequestType;
        // return data;
    }

    return (
        <>
            <Link to={{ pathname: "/view", state: { mock: props.mock, request: getAllRequests() } }}>
                <h4>
                    {props.mock.name}
                </h4>
            </Link>
        </>
    );
}

export default MockTile;