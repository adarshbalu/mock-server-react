import { FunctionComponent, useContext, useEffect, useState, } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { MocksContext } from "../../contexts/mocks_contex";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import '../mocks/Mock.css';
import URL from "../../utils/urls";
import MockDetailsTile from "./MockDetailsTile";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface MockDetailsProps {

}

interface StateType {
    mock: Mock;
    request: Array<RequestType>;
}


const MockDetails: FunctionComponent<MockDetailsProps> = (props) => {
    const history = useHistory<StateType>();
    const mock = history.location.state.mock;
    const [allMocks, setAllMocks] = useState([] as Array<Mock>);
    const req = history.location.state.request;

    const { setMocks } = useContext(MocksContext);

    useEffect(() => {
        const getMocks = async () => {
            try {
                const allMocksList: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
                setAllMocks(allMocksList);
                setMocks(allMocksList);
            }
            catch (e) {
                console.log(e);
                setMocks([]);
            }
        }
        getMocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderRequestsList = () => {

        if (req.length > 0) {
        let i = 0;

        return req.map((request) => {
            i++;
            return <div key={request.id}><MockDetailsTile mock={mock} request={request} index={i} /></div>
        });
        }
        else {
            return <h5>No requests added. Add request to continue.</h5>
        }
    }

    const deleteMock = async (id: string) => {
        await APIService.delete(URL.MOCK_PATH, id);
        const tempMocksList: Mock[] = [];
        allMocks.forEach((m) => {
            if (m.id !== id) { tempMocksList.push(m); }
        });
        setMocks(tempMocksList);
        history.go(-1);
    }


    return (<>
        <section className="mock-details">
            <div className="mock-details-row">
            <h2>{mock.name}</h2>

                <div className="mock-details-buttons-row">
                <Link to={{ pathname: "/add", state: { mock: mock, } }} >
                    <Button variant="contained" startIcon={<AddIcon />} color="info" className="add-request-button">
                            Add new Request
                        </Button>
                </Link>
                    <div className="delete-mock-button">
                        <Button variant="contained" startIcon={<DeleteOutlineIcon />} color="error" onClick={() => deleteMock(mock.id!)} >
                            Delete mock server
                        </Button>
                    </div>
                </div>
            </div>
            {renderRequestsList()}



        </section>
    </>);
}

export default MockDetails;