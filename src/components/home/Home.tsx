import { FunctionComponent, useContext, useEffect, } from "react";
import { useHistory } from "react-router";
import { MocksContext } from "../../contexts/mocks_contex";
import APIService from "../../services/api_service";
import Mock from "../../types/mock";
import URL from "../../utils/urls";
import MocksList from "../mocks/MocksList";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {

    const history = useHistory();
    const { setMocks } = useContext(MocksContext);

    useEffect(() => {
        const getMocks = async () => {
            const allMocks: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
            setMocks(allMocks);
        }
        getMocks();
    }, []);


    return (<>
        <h1>List of Mock servers</h1>
        <MocksList />
        <button onClick={() => history.push("/create")}>Add new mock server</button>
    </>);
}

export default Home;