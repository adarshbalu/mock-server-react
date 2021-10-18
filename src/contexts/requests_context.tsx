import { createContext, useEffect, useState } from "react";
import APIService from "../services/api_service";
import RequestType from "../types/request_type";
import URL from "../utils/urls";


export type RequestContextType = {
    request: Array<RequestType>;
}

type Props = {
    children: React.ReactNode;
};

const initialState: RequestContextType = {
    request: []
}

export const RequestContext = createContext<RequestContextType>(initialState);

export const RequestContextProvider = (props: Props) => {
    const [request, setRequest] = useState([] as Array<RequestType>);

    useEffect(() => {
        const getRequest = async () => {
            const allRequest: RequestType[] = await APIService.get(URL.REQUEST_PATH) as RequestType[];
            setRequest(allRequest);
        }
        getRequest();
    }, []);

    return (
        <RequestContext.Provider value={{ request }}>
            {props.children}
        </RequestContext.Provider>
    );
}
