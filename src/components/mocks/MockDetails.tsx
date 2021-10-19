import { FunctionComponent, } from "react";
import { useHistory } from "react-router";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import '../mocks/Mock.css';

interface MockDetailsProps {

}

interface StateType {
    mock: Mock;
    request: RequestType;
}


const MockDetails: FunctionComponent<MockDetailsProps> = (props) => {
    const history = useHistory<StateType>();
    const mock = history.location.state.mock;
    const req = history.location.state.request;




    return (<>
        <section className="mock-details">
            <h2>{mock.name}</h2>

            <h5>Params</h5>
            {<div><pre>{JSON.stringify(req.params, null, 2)}</pre></div>}

        <h5>Response</h5>
            {<div><pre>{JSON.stringify(req.response, null, 2)}</pre></div>}


        </section>
    </>);
}

export default MockDetails;