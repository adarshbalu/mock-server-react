import { FunctionComponent, useContext, useEffect, } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { MocksContext } from "../../contexts/mocks_contex";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import '../mocks/Mock.css';
import URL from "../../utils/urls";
import MockDetailsTile from "./MockDetailsTile";
import { RequestContext } from "../../contexts/requests_context";

interface MockDetailsProps {

}

interface StateType {
    mock: Mock;
    request: Array<RequestType>;
}


const MockDetails: FunctionComponent<MockDetailsProps> = (props) => {
    const history = useHistory<StateType>();
    const mock = history.location.state.mock;
    const req = history.location.state.request;

    const { setMocks } = useContext(MocksContext);
    const { setRequest } = useContext(RequestContext);

    useEffect(() => {
        const getMocks = async () => {
            try {
                const allMocks: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
                setMocks(allMocks);
                const allRequests: RequestType[] = await APIService.get(URL.REQUEST_PATH) as RequestType[];
                setRequest(allRequests);
            }
            catch (e) {
                console.log(e);
                setMocks([]);
                setRequest([]);
            }
        }
        getMocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>
        <section className="mock-details">
            <div className="mock-details-row">
            <h2>{mock.name}</h2>
                <Link to={{ pathname: "/add", state: { mock: mock, } }}>Add new request</Link>
            </div>
            {req.map((request) => {
                return <MockDetailsTile mock={mock} request={request} />
            })}



        </section>
    </>);
}

export default MockDetails;