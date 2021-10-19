
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./home/Home";
import CreateNew from "./create/CreateNew";
import { MocksContextProvider } from "../contexts/mocks_contex";
import MockDetails from "./mocks/MockDetails";
import { RequestContextProvider } from "../contexts/requests_context";
import AddRequest from "./mocks/AddRequest";
function App() {
  return (
    <MocksContextProvider>
      <RequestContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/create">
              <CreateNew />
            </Route>
            <Route path="/view">
              <MockDetails />
            </Route>
            <Route path="/add">
              <AddRequest />
            </Route>
          </Switch>
        </Router>
      </RequestContextProvider>
    </MocksContextProvider>
  );
}

export default App;
