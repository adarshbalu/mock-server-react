import Button from "@mui/material/Button";
import { FunctionComponent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MocksContext } from "../../contexts/mocks_contex";
import { RequestContext } from "../../contexts/requests_context";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";
import DeleteIcon from '@mui/icons-material/Delete';
import '../mocks/Mock.css';

interface MockDetailsTileProps {
    mock: Mock;
    request: RequestType;
}

const MockDetailsTile: FunctionComponent<MockDetailsTileProps> = (props: MockDetailsTileProps) => {
    const { setRequest, request: requests } = useContext(RequestContext);
    const { setMocks, mocks } = useContext(MocksContext);

    const history = useHistory();

    const request = props.request;
    const mock = props.mock;

    const deleteRequest = async () => {
        const requstList = mock.requests.filter((r) => {
            return r !== request.id;
        });
        const newMock = {
            ...mock,
            requests: requstList
        } as Mock;

        const newMocksList = mocks;
        //Update state of mock
        mocks.forEach((m) => {

            if (m.id === newMock.id) {
                newMocksList.splice(mocks.indexOf(m), 1);
                newMocksList.push(newMock);

            }
        });
        setMocks(newMocksList);

        const newRequestList = requests;
        //Update state of request
        requests.forEach((r) => {
            if (r.id === request.id) {
                newRequestList.splice(requests.indexOf(request), 1);
            }
        });
        setRequest(newRequestList);

        await APIService.put(URL.MOCK_PATH + `/${mock.id}`, newMock);
        await APIService.delete(URL.REQUEST_PATH, request.id!);
        history.go(-1);
    }

    const getAPIURL = (): string => {
        let finalURL = URL.API_BASE_URL + "/" + request.endPoint;
        if (request.params !== {}) {
            finalURL = finalURL + "?";
            const values = Object.values(request.params);
            let i: number = 0;
            for (const param in request.params) {
                finalURL = finalURL + param + "=" + values[i];
                i++;
                if (i !== values.length) {
                    finalURL = finalURL + "&";
                }
            }
        }
        return finalURL;
    }
    return (<>
        <section className="mock-details-card">
            {request.method === "GET" ? <h6>URL : <a href={getAPIURL()} target="__blank">{getAPIURL()}</a></h6> : <h6>URL : {getAPIURL()}</h6>}
        <h6>Endpoint : {request.endPoint}</h6>
        <h6>Method : {request.method}</h6>

        <h5>Params :</h5>
        {<div><pre>{JSON.stringify(request.params, null, 2)}</pre></div>}

        <h5>Body :</h5>
        {<div><pre>{JSON.stringify(request.body, null, 2)}</pre></div>}

        <h5>Response :</h5>
        {<div><pre>{JSON.stringify(request.response, null, 2)}</pre></div>}

            <div className="delete-button-row">
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteRequest()}>
                    Delete
                </Button>
            </div>
        </section>
    </>
    );
}

export default MockDetailsTile;