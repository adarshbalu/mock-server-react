import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React, { ChangeEvent } from "react";
import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import APIService from "../../services/api_service";
import { METHODLIST } from "../../types/methods";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";
import Util from "../../utils/util";
import SaveIcon from '@mui/icons-material/Save';
import { Button, IconButton, } from "@mui/material";
import '../create/CreateNew.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
interface CreateNewProps {

}


const CreateNew: FunctionComponent<CreateNewProps> = () => {
    const [name, setName] = useState("");
    const [method, setMethod] = useState("GET");
    const [endPoint, setEndPoint] = useState(`api`);
    const [body, setBody] = useState("{}");
    const [paramsInputList, setParamsInputList] = useState([{ key: "", value: "" }, { key: "", value: "" }, { key: "", value: "" }]);
    let params = {};
    const [res, setRes] = useState("{}");
    const history = useHistory();

    const [status, setStatus] = useState("200");


    // reset all input fields
    const resetAllFields = () => {
        setName("");
        setMethod("GET");
        setEndPoint("api");
        setBody("{}");
        setParamsInputList([{ key: "", value: "" }, { key: "", value: "" }, { key: "", value: "" }]);
        params = {};
        setRes("{}");
        setStatus("200");
    }


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
        setParamsInputList([{ key: "", value: "" }, ...paramsInputList,]);
    };


    const pushPath = () => {
        let path = `/home`;
        history.push(path);

    }

    const handleSubmit = async () => {
        const trimEndpoint = endPoint.trim();

        if (name.trim() === "" || method.trim() === "" || trimEndpoint === "" || res.trim() === "") {
            alert("All fields required");

        }
        else if (name.trim().includes(" ") || !name.trim().match(/^([0-9]|[a-z])+([0-9a-z]+)$/i)) {
            alert("Invalid mock Name ");
        }

        else if (trimEndpoint[0] === '/' || trimEndpoint[trimEndpoint.length - 1] === '/' || trimEndpoint.includes("/") || !trimEndpoint.match(/^([0-9]|[a-z])+([0-9a-z]+)$/i)) {
            alert("Invalid endpoint ");
        }
        else if (isNaN(+status.trim())) {
            alert("Invalid status");
        }
        else {

            try {
                params = {};
                paramsInputList.forEach((input) => {
                    if (input.key.trim() !== "" && input.value.trim() !== "")
                    params = {
                        ...params,
                        [input.key]: input.value
                    };

                });
                let requestData: RequestType = {
                    method: method,
                    status: parseInt(status.trim()),
                    body: body,
                    endPoint: endPoint,
                    params: params,
                    response: res,
                    mockName: name.replace(/\s/g, "")

                };
                if (Util.checkForJSON(res)) {
                    requestData = { ...requestData, response: JSON.parse(res) }
                }
                if (Util.checkForJSON(body)) {
                    requestData = { ...requestData, body: JSON.parse(body) }
                }


                const mockServerData: Mock = {
                    name: name.replace(/\s/g, ""),
                     requests: [requestData]

                };


                await APIService.post(URL.MOCK_PATH, mockServerData);

            } catch (e) {
                console.log(e);
                alert("Problem occured : Failed to create mock server");

            }
            pushPath();

        }
    }


    const renderMethodOptions = () => {
        return (
            <div className="form-item">

                <label htmlFor="select" className="label-style"> Method  </label>

                {React.createElement(
                    "select",
                    {
                        required: true,
                        placeholder: "Request method",
                        name: "method",
                        value: method,
                        className: "method-select",
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
        );
    }


    const renderEndPointInput = () => {
        return <div className="form-item">
            <label className="label-style" htmlFor="text">
                Request endpoint
            </label>
            <input
                className=""
                type="text"
                id="url"
                placeholder="Endpoint"
                required
                value={endPoint}
                onChange={(e) => {
                    setEndPoint(e.target.value);

                }}
            />
        </div>;
    }

    const renderNameInput = () => {
        return (
            <div className="form-item"><label className="label-style" htmlFor="text">
                Server name
            </label>
                <input
                    className="name-input-field"
                    type="text"
                    id="name"
                    placeholder="Mock server name"
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                /></div>
        );
    }


    const renderStatusInput = () => {
        return (
            <div className="form-item"><label className="label-style" htmlFor="text">
                Status code
            </label>
                <input
                    className="name-input-field"
                    type="text"
                    id="status"
                    placeholder="Status code"
                    required
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                /></div>
        );
    }


    const renderParamsInput = () => {
        return (
            <div className="param-section">
                <div className="param-title-row">
                    <label className="label-style" htmlFor="text">
                        Parameters
                    </label>
                    <div className="add-param-button">
                        <Button onClick={handleAddClick}
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon />}
                        >Add param</Button></div>

                </div>
                <div className="param-scroll">
                    {paramsInputList.map((x, i) => {
                        return (
                            <>
                                <div className="">


                                    <input
                                        className="input-medium"
                                    name="key"
                                    placeholder="Enter param"
                                    value={x.key}
                                    onChange={e => handleInputChange(e, i)}
                                />
                                <input
                                    name="value"
                                        className=" input-medium"
                                    placeholder="Enter param value"
                                    value={x.value}
                                    onChange={e => handleInputChange(e, i)}
                                    />


                                    {paramsInputList.length !== 1 && <IconButton color="error"
                                        onClick={() => handleRemoveClick(i)} ><RemoveCircleOutlineIcon /></IconButton>}



                                </div>


                            </>
                        );
                    })}
                </div>
            </div>
        );
    }

    const renderBodyInput = () => {
        return (
            <>
                <div className="">
                            <label className="label-style" htmlFor="text">
                                Raw request body
                            </label>
                    <textarea
                        className="input-large"

                                id="body"
                                required
                        placeholder="{}"
                                value={body}
                                onChange={(e) => {
                                    setBody(e.target.value);
                                }}
                            /></div>
            </>
        );
    }

    const renderResponseInput = () => {
        return (
            <>
                <div className="">
                    <label className="label-style" htmlFor="text">
                        Raw response
                    </label>
                    <textarea
                        className="input-large"

                        id="response"
                        required
                        placeholder="{}"
                        value={res}
                        onChange={(e) => {
                            setRes(e.target.value);
                        }}
                    />
                        </div>
            </>
        );
    }


    return (
        <>

            <div className="create-new-title-row">
                <h3>Create new Mock Server</h3>
                <div className="action-buttons">
                    <Button variant="contained" color="warning" startIcon={<RefreshIcon />} onClick={resetAllFields}>
                        Reset
                    </Button>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={async (e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} color="info">
                        Save
                    </Button>
                </div>
            </div>


            <section className="create-new">
                <form>
                    <div className="create-new-grid">
                        {/* Left side of the grid */}
                        <div className="create-new-left">
                            {/* Mock server name input */}
                            {renderNameInput()}

                            {/* Options to select request method */}
                            {renderMethodOptions()}

                            {/* Input field to add request endpoint */}
                            {renderEndPointInput()}

                            {/* Input field to add status code */}
                            {renderStatusInput()}


                        </div>






                        <div className="create-new-right">

                            {/* Input fields for url parameters */}
                            {renderParamsInput()}


                        </div>
                    </div>




                    <div className="create-new-grid">

                        {/* Input for raw request body */}
                        {renderBodyInput()}


                        {/* Input field for Raw response */}

                        {renderResponseInput()}
                    </div>

                </form>

            </section>
        </>
    );
}




export default CreateNew;