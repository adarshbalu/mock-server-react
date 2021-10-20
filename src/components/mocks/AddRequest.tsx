import { ChangeEvent, FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import Util from "../../utils/util";
import URL from "../../utils/urls";
import { METHODLIST } from "../../types/methods";
import React from "react";

interface AddRequestProps {
}

interface StateType {
    mock: Mock;
}

const AddRequest: FunctionComponent<AddRequestProps> = () => {

    const history = useHistory<StateType>();
    const mock = history.location.state.mock;
    const [method, setMethod] = useState("GET");
    const [endPoint, setEndPoint] = useState(`api`);
    const [paramsInputList, setParamsInputList] = useState([{ key: "", value: "" }]);
    let params = {};
    const [res, setRes] = useState("{}");
    const [body, setBody] = useState("{}");


    // handle params input change
    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list: any[] = [...paramsInputList];
        list[index][name] = value;
        setParamsInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...paramsInputList];
        list.splice(index, 1);
        setParamsInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setParamsInputList([...paramsInputList, { key: "", value: "" }]);
    };


    const pushPath = () => {
        let path = `/home`;
        history.push(path);

    }

    const handleSubmit = async () => {
        const trimEndpoint = endPoint.trim();
        if (method === "" || endPoint === "" || res === "") {
            alert("All fields required");

        } else if (trimEndpoint[0] === '/' || trimEndpoint[trimEndpoint.length - 1] === '/' || trimEndpoint.includes("/")) {
            alert("Invalid endpoint");
        }
        else {

            try {
                params = {};
                paramsInputList.forEach((input) => {
                    params = {
                        ...params,
                        [input.key]: input.value
                    };

                });
                let requestData: RequestType = {
                    method: method,
                    status: 200,
                    body: body,
                    endPoint: endPoint,
                    params: params,
                    response: res,
                    mockName: mock.name
                };
                if (Util.checkForJSON(res)) {
                    requestData = { ...requestData, response: JSON.parse(res) }
                }

                if (Util.checkForJSON(body)) {
                    requestData = { ...requestData, body: JSON.parse(body) }
                }
                const newRequst = await APIService.post(URL.REQUEST_PATH, requestData) as RequestType;
                const mockServerData: Mock = {
                    ...mock,
                    requests: [...mock.requests, newRequst.id!]

                };

                await APIService.put(URL.MOCK_PATH + `/${mock.id}`, mockServerData);

            } catch (e) {
                console.log(e);

            }
            pushPath();

        }
    }

    return (
        <>
            <section className="create-new">
                <h3>Add new request to {mock.name}</h3>
                <form>


                    <div className="form-row">

                        {/* Options to select request method */}
                        <div className="form-item">
                            <div className="field">
                                <label> Method </label>

                                {React.createElement(
                                    "select",
                                    {
                                        required: true,
                                        placeholder: "Request method",
                                        name: "method",
                                        value: method,
                                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                                            setMethod(e.target.value);
                                        },
                                    },

                                    METHODLIST.map((method) => {
                                        return React.createElement(
                                            "option",

                                            {
                                                value: method,
                                                key: method,
                                            },
                                            method
                                        );
                                    })
                                )}
                            </div>

                        </div>


                        {/* Input field to add request endpoint */}
                        <div className="form-item">
                            <label className="label-style" htmlFor="text">
                                Request endpoint
                            </label>
                            <input
                                className="input-field"
                                type="text"
                                id="url"
                                required
                                value={endPoint}
                                onChange={(e) => {
                                    setEndPoint(e.target.value);

                                }}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="button-row">
                            {/* Button to Save         */}
                            <div className="form-item">
                                <button
                                    className="save-button"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        handleSubmit();



                                    }}

                                >
                                    Save request
                                </button>

                            </div>

                        </div>
                    </div>
                    <br />

                    {/* Input fields for url parameters */}
                    <label className="label-style" htmlFor="text">
                        Parameters
                    </label>
                    {paramsInputList.map((x, i) => {
                        return (
                            <>
                                <div className="form-row" key={i}>

                                    <input
                                        className="form-item"
                                        name="key"

                                        placeholder="Enter param"
                                        value={x.key}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                        name="value"
                                        className="form-item"
                                        placeholder="Enter param value"
                                        value={x.value}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <div className="form-item">

                                        {paramsInputList.length !== 1 && <button
                                            onClick={() => handleRemoveClick(i)}>Remove</button>}


                                    </div>

                                </div>
                                {paramsInputList.length - 1 === i && <button style={{ marginTop: "10px", marginBottom: "20px" }} onClick={handleAddClick}>Add param</button>}
                            </>
                        );
                    })}
                    <br />
                    <div className="form-row">

                        {/* Input for raw request body */}
                        <div className="form-item">
                            <label className="label-style" htmlFor="text">
                                Raw request body
                            </label>
                            <input
                                className="input-field"
                                type="text"
                                id="body"
                                required
                                value={body}
                                onChange={(e) => {
                                    setBody(e.target.value);
                                }}
                            /></div>



                        {/* Input field for Raw response */}
                        <div className="form-item">
                            <label className="label-style" htmlFor="text">
                                Raw response
                            </label>
                            <input
                                className="input-field"
                                type="text"
                                id="response"
                                required
                                value={res}
                                onChange={(e) => {
                                    setRes(e.target.value);
                                }}
                            />
                        </div>
                    </div>




                </form>
            </section>
        </>
    );
}

export default AddRequest;