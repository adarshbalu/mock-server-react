
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./home/Home";
import CreateNew from "./create/CreateNew";
import { MocksContextProvider } from "../contexts/mocks_contex";
import MockDetails from "./mocks/MockDetails";
import AddRequest from "../components/create/AddRequest";
function App() {
  return (
    <MocksContextProvider>
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
    </MocksContextProvider>
  );
}

export default App;
