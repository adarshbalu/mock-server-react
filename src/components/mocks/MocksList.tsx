import { FunctionComponent, useContext } from "react";
import { MocksContext } from "../../contexts/mocks_contex";
import MockTile from "../home/MockTile";
import '../mocks/Mock.css';

interface MocksListProps {

}

const MocksList: FunctionComponent<MocksListProps> = () => {

    const renderMocksList = () => {
        let i = 0;
        return mocks.map((mock) => {
            i++;
            return <MockTile mock={mock} key={mock.name} index={i} />
        });
    }

    const { mocks } = useContext(MocksContext);
    return (
        <> <div className="mock-list">
            {
                mocks.length === 0 ?
                    <h6>Empty</h6> :
                    <div>
                        {renderMocksList()}
                    </div>
            }
        </div>
        </>
    );
}

export default MocksList;