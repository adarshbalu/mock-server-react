import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import Mock from "../types/mock";
import URL from "../utils/urls";


export type MocksContextType = {
    mocks: Array<Mock>;
    setMocks: any;
}

type Props = {
    children: React.ReactNode;
};

const initialState: MocksContextType = {
    mocks: [],
    setMocks: {},
}

export const MocksContext = createContext<MocksContextType>(initialState);

export const MocksContextProvider = (props: Props) => {
    const [mocks, setMocks] = useState([] as Array<Mock>);

    useEffect(() => {
        const getMocks = async () => {
            const allMocks: Mock[] = await APIService.get(URL.MOCK_PATH) as Mock[];
            setMocks(allMocks);
        }
        getMocks();
    }, []);

    return (
        <MocksContext.Provider value={{ mocks, setMocks }}>
            {props.children}
        </MocksContext.Provider>
    );
}
