
import React, { ChangeEvent } from "react";
import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../services/api_service";
import { METHODLIST } from "../../types/methods";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";
import Util from "../../utils/util";
import '../create/CreateNew.css';

interface CreateNewProps {

}


const CreateNew: FunctionComponent<CreateNewProps> = () => {
    const [name, setName] = useState("");
    const [method, setMethod] = useState("GET");
    const [endPoint, setEndPoint] = useState(`/api`);
    const [inputList, setInputList] = useState([{ key: "", value: "" }]);
    let params = {};
    const [res, setRes] = useState("");
    const history = useHistory();


    // handle params input change
    const handleInputChange = (e: any, index: number) => {
        const { name, value } = e.target;
        const list: any[] = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { key: "", value: "" }]);
    };


    const pushPath = () => {
        let path = `/home`;
        history.push(path);

    }

    const handleSubmit = async () => {

        if (name === "" || method === "" || endPoint === "" || res === "") {
            alert("All fields required");

        }
        else {

            try {
                params = {};
                inputList.forEach((input) => {
                    params = {
                        ...params,
                        [input.key]: input.value
                    };

                });
                let requestData: RequestType = {
                    method: method,
                    status: 200,
                    params: params,
                    response: res,

                };
                if (Util.checkResponseForJSON(res)) {
                    requestData = { ...requestData, response: JSON.parse(res) }
                }


                const newRequst = await APIService.post(URL.REQUEST_PATH, requestData) as RequestType;
                const mockServerData: Mock = {
                    name: name,
                    requests: [newRequst.id!]

                };


                await APIService.post(URL.MOCK_PATH, mockServerData);

            } catch (e) {
                console.log(e);

            }
            pushPath();

        }
    }

    return (
        <>
            <section className="create-new">
                <h3>Create new Mock Server</h3>
                <form>
                    <label className="label-style" htmlFor="text">
                        Mock server name
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />


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

                            {/* Button to add next request         */}
                            <div className="form-item">
                                <button
                                    hidden
                                    className="add-button"
                                    onClick={() => {

                                    }}

                                >
                                    Add new
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />

                    {/* Input fields for url parameters */}
                    <label className="label-style" htmlFor="text">
                        Parameters
                    </label>
                    {inputList.map((x, i) => {
                        return (

                            <div>

                                <input
                                    name="key"
                                    placeholder="Enter param"
                                    value={x.key}
                                    onChange={e => handleInputChange(e, i)}
                                />
                                <input
                                    name="value"
                                    placeholder="Enter param value"
                                    value={x.value}
                                    onChange={e => handleInputChange(e, i)}
                                />
                                <div className="btn-box">

                                    {inputList.length !== 1 && <button
                                        onClick={() => handleRemoveClick(i)}>Remove</button>}

                                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                </div>
                            </div>
                        );
                    })}
                    <br />
                    {/* Input field for Raw response */}
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




                </form>
            </section>
        </>
    );
}




export default CreateNew;