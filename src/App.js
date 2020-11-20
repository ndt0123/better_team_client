import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AboutUs from './components/static_pages/about_us';
import SignIn from './components/sign_in/sign_in';
import SignUp from './components/sign_up/sign_up';

import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <AboutUs />
          </Route>
          <Route path="/about_us" exact>
            <AboutUs />
          </Route>
          <Route path="/sign_in" exact>
            <SignIn />
          </Route>
          <Route path="/sign_up" exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
