import Button from "@mui/material/Button";
import { FunctionComponent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MocksContext } from "../../contexts/mocks_contex";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";
import DeleteIcon from '@mui/icons-material/Delete';
import '../mocks/Mock.css';

interface MockDetailsTileProps {
    mock: Mock;
    request: RequestType;
    index: number;
}

const MockDetailsTile: FunctionComponent<MockDetailsTileProps> = (props: MockDetailsTileProps) => {
    const { setMocks, mocks } = useContext(MocksContext);

    const history = useHistory();

    const request = props.request;
    const mock = props.mock;

    const deleteRequest = async () => {
        const requstList = mock.requests.filter((r) => {
            return r.id !== request.id;
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


        try {
        await APIService.delete(URL.MOCK_PATH, `${mock.id}/${request.id}`);
        history.go(-1);
        }
        catch (e) {
            alert("Failed to delete request");
            history.go(-1);
        }
    }



    const getAPIURL = (): string => {
        let finalURL = URL.API_BASE_URL + "/" + request.mockName + "/" + request.endPoint;
        if (request.params !== {} && Object.entries(request.params).length > 0) {
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

    const getAPIURLElement = () => {
        const apiurl = getAPIURL();
        if (request.method === "POST") {

            // <form method="POST"
            //     action={apiurl}
            //     name="postForm" id="postForm" hidden></form>
            // const values = Object.values(request.body);
            // let i: number = 0;
            // for (const b in request.body) {

            // }
            return apiurl;
        }
        else if (request.method === "GET") {

            return <a href={apiurl} target="__blank">{apiurl}</a>;
        }
        else {
            return apiurl;
        }

    }

    return (<>
        <section className="mock-details-card">
            <div className="request-row">
                <div>

                    <h5 className="request-subtitle">URL : <span> {getAPIURLElement()}</span>
                    </h5>



                    <h5 className="request-subtitle">Endpoint : <span>{request.endPoint}</span></h5>
                    <h5 className="request-subtitle">Method : <span>{request.method}</span></h5>

                    <h5 className="request-subtitle">Params :</h5>
                    {<div className="json-display"><pre>{JSON.stringify(request.params, null, 2)}</pre></div>}

                    <h5 className="request-subtitle">Body :</h5>
                    {<div className="json-display"><pre>{JSON.stringify(request.body, null, 2)}</pre></div>}

                    <h5 className="request-subtitle">Response :</h5>
                    {<div className="json-display"><pre>{JSON.stringify(request.response, null, 2)}</pre></div>}
                </div>
                <div className="delete-request-button">
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteRequest()}>
                        Delete
                    </Button>
                </div>
            </div>

        </section>
    </>
    );
}

export default MockDetailsTile;