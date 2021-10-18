
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
    const [url, setUrl] = useState(`http://localhost:5000/api`);
    let params = {};
    const [res, setRes] = useState("");

    const history = useHistory();
    const splitParams = (): boolean => {

        if (Util.checkForValidURL(url)) {

            params = Util.getParmsFromURL(url);
            return true;
        } else {
            return false;
        }
    }


    const pushPath = () => {
        let path = `/home`;
        history.push(path);

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


                        {/* Input field to add request url */}
                        <div className="form-item">
                            <label className="label-style" htmlFor="text">
                                Request url with query parameters
                            </label>
                            <input
                                className="input-field"
                                type="text"
                                id="url"
                                required
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);

                                }}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="button-row">
                            {/* Button to add next request         */}
                            <div className="form-item">
                                <button
                                    className="save-button"
                                    onClick={async (e) => {
                                        e.preventDefault();

                                        if (name === "" || method === "" || url === "" || res === "") {
                                            alert("All fields required");

                                        }
                                        else {
                                            if (splitParams()) {

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
                                                pushPath();
                                            } else {
                                                alert("Invalid URL");
                                            }
                                        }

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