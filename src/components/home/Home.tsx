import { FunctionComponent, useContext, useEffect, } from "react";
import { useHistory } from "react-router";
import { MocksContext, MockState } from "../../contexts/mocks_contex";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import URL from "../../utils/urls";
import MocksList from "../mocks/MocksList";
import '../home/Home.css';
import { Button } from "@mui/material";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {

    const history = useHistory();
    const { setMocks, setMockState } = useContext(MocksContext);

    useEffect(() => {
        const getMocks = async () => {
            setMockState(MockState.LOADING);
            try {
            const allMocks: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
                setMocks(allMocks);
                setMockState(MockState.SUCESS);
            }
            catch (e) {
                console.log(e);
                setMocks([]);
                setMockState(MockState.ERROR);
            }
        }
        getMocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<>
        <section className="home-section">
            <div className="home-title-row">
                <h1>Mock servers</h1>
            <div className="create-new-button-row">
                    <Button variant="contained" className="create-new-button" onClick={() => history.push("/create")}>Create mock server</Button>
            </div>
            </div>
            <MocksList />

        </section>

    </>);
}

export default Home;