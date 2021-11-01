import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Mock from "../types/mock";
import URL from "../utils/urls";

export enum MockState { LOADING, SUCESS, ERROR, NONE }

export type MocksContextType = {
    mocks: Array<Mock>;
    setMocks: any;
    mockState: MockState;
}

type Props = {
    children: React.ReactNode;
};

const initialState: MocksContextType = {
    mocks: [],
    setMocks: {},
    mockState: MockState.NONE,
}

export const MocksContext = createContext<MocksContextType>(initialState);

export const MocksContextProvider = (props: Props) => {
    const [mocks, setMocks] = useState([] as Array<Mock>);
    const [mockState, setMockState] = useState(MockState.NONE);
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
    }, []);

    return (
        <MocksContext.Provider value={{ mocks, setMocks, mockState }}>
            {props.children}
        </MocksContext.Provider>
    );
}
