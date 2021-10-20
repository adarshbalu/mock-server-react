import { FunctionComponent, useContext, } from "react";
import { Link } from "react-router-dom";
import { RequestContext } from "../../contexts/requests_context";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import '../mocks/Mock.css';
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
    }

    return (
        <><div className="mock-list-item">
            <Link className="mock-list-item-link" to={{ pathname: "/view", state: { mock: props.mock, request: getAllRequests() } }}>

                    {props.mock.name}

            </Link> </div>
        </>
    );
}

export default MockTile;