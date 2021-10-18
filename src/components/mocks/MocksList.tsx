import { FunctionComponent, useContext } from "react";
import { MocksContext } from "../../contexts/mocks_contex";
import MockTile from "../home/MockTile";
import '../mocks/Mock.css';

interface MocksListProps {

}

const MocksList: FunctionComponent<MocksListProps> = () => {
    const { mocks } = useContext(MocksContext);
    return (
        <><div className="mock-list">
            {mocks.map((mock) => { return <MockTile mock={mock} key={mock.name} /> })}
        </div>
        </>
    );
}

export default MocksList;