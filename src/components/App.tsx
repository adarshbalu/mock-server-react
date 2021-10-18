
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import LandingPage from "./landing/LandingPage";
import Home from "./home/Home";
import CreateNew from "./create/CreateNew";
import { MocksContextProvider } from "../contexts/mocks_contex";
import MockDetails from "./mocks/MockDetails";
import { RequestContextProvider } from "../contexts/requests_context";
function App() {
  return (
    <MocksContextProvider>
      <RequestContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
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
            <Route path="/api"></Route>
          </Switch>
        </Router>
      </RequestContextProvider>
    </MocksContextProvider>
  );
}

export default App;
