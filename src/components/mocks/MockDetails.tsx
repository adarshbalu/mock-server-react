import { FunctionComponent, } from "react";
import { useHistory } from "react-router";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";

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




    return (<><h2>Details</h2>
        {mock.name}
        <br />
        <h5>Response</h5>
        {req === undefined ? "" : Object.entries(req.response)}
        <h5>Params</h5>
        {Object.entries(req.params)}
        <h5>Status</h5>
        {req.status}
    </>);
}

export default MockDetails;