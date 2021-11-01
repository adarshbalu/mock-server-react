import CircularProgress from "@mui/material/CircularProgress";
import { FunctionComponent, useContext } from "react";
import { MocksContext, MockState } from "../../contexts/mocks_contex";
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

    const { mocks, mockState } = useContext(MocksContext);
    return (
        <>
            <div className="mock-list">

                {mockState === MockState.SUCESS ?
                    (mocks.length === 0 ?
                        <h6>No mock servers found. Create new mock-server to conitue.</h6> :
                    <div>
                        {renderMocksList()}
                    </div>
                    ) : <><CircularProgress /></>

                }
            </div>
        </>
    );
}

export default MocksList;