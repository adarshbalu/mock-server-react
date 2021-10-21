import { FunctionComponent, useContext, } from "react";
import { Link } from "react-router-dom";
import { RequestContext } from "../../contexts/requests_context";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import '../mocks/Mock.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface MockTileProps {
    mock: Mock;
    index: number;
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
        <>
            <Link className="mock-list-item-link" to={{ pathname: "/view", state: { mock: props.mock, request: getAllRequests() } }}>
                <div className="mock-list-item">
                    <div>

                        <i>{props.index}</i>

                        {props.mock.name} <span>({props.mock.requests.length})</span>


                    </div>
                    <ArrowRightIcon color="secondary" />
                </div>
            </Link>
        </>
    );
}

export default MockTile;