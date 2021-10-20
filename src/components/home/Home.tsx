import { FunctionComponent, useContext, useEffect, } from "react";
import { useHistory } from "react-router";
import { MocksContext } from "../../contexts/mocks_contex";
import { RequestContext } from "../../contexts/requests_context";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import RequestType from "../../types/request_type";
import URL from "../../utils/urls";
import MocksList from "../mocks/MocksList";
import '../home/Home.css';
import { Button } from "@mui/material";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {

    const history = useHistory();
    const { setMocks } = useContext(MocksContext);

    const { setRequest } = useContext(RequestContext);
    useEffect(() => {
        const getMocks = async () => {
            try {
            const allMocks: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
                setMocks(allMocks);
                const allRequests: RequestType[] = await APIService.get(URL.REQUEST_PATH) as RequestType[];
                setRequest(allRequests);
            }
            catch (e) {
                console.log(e);
                setMocks([]);
                setRequest([]);
            }
        }
        getMocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<>
        <section className="home-section">
            <h1>Mock servers</h1>
            <MocksList />
            <div className="create-new-button-row">
                <Button variant="contained" className="create-new-button" onClick={() => history.push("/create")}>Add new mock server</Button>
            </div>
        </section>

    </>);
}

export default Home;