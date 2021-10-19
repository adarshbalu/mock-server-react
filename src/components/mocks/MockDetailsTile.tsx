import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";

interface MockDetailsTileProps {
    mock: Mock;
    request: RequestType;
}

const MockDetailsTile: FunctionComponent<MockDetailsTileProps> = (props: MockDetailsTileProps) => {
    const history = useHistory();

    const pushPath = () => {
        let path = `/home`;
        history.push(path);

    }


    const deleteRequest = async () => {
        const requstList = props.mock.requests.filter((r) => {
            return r !== props.request.id;
        });
        const newMock = {
            ...props.mock,
            requests: requstList
        } as Mock;
        await APIService.put(URL.MOCK_PATH + `/${props.mock.id}`, newMock);
        await APIService.delete(URL.REQUEST_PATH, props.request.id!);
        pushPath();
    }
    return (<>
        <h6>Endpoint : {props.request.endPoint}</h6>
        <h6>Method : {props.request.method}</h6>

        <h5>Params :</h5>
        {<div><pre>{JSON.stringify(props.request.params, null, 2)}</pre></div>}

        <h5>Body :</h5>
        {<div><pre>{JSON.stringify(props.request.body, null, 2)}</pre></div>}

        <h5>Response :</h5>
        {<div><pre>{JSON.stringify(props.request.response, null, 2)}</pre></div>}

        <button onClick={() => deleteRequest()}>Delete</button>
        <hr />
    </>
    );
}

export default MockDetailsTile;