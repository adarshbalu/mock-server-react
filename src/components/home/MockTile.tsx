import { FunctionComponent, } from "react";
import { Link } from "react-router-dom";
import Mock from "../../types/mock";
import '../mocks/Mock.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface MockTileProps {
    mock: Mock;
    index: number;
}

const MockTile: FunctionComponent<MockTileProps> = (props: MockTileProps) => {
    const mock = props.mock;


    return (
        <>
            <Link className="mock-list-item-link" to={{ pathname: "/view", state: { mock: props.mock, request: mock.requests } }}>
                <div className="mock-list-item">
                    <div>

                        <i>{props.index}</i>

                        {props.mock.name} <span>({props.mock.requests.length})</span>


                    </div>
                    <ArrowRightIcon color="secondary" />
                </div>
            </Link>
        </>
    );
}

export default MockTile;