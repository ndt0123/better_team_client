import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AboutUs from './components/static_pages/about_us';
import SignIn from './components/sign_in/sign_in';
import SignUp from './components/sign_up/sign_up';
import Main from './components/main/main';

import './styles/main.scss';
import './styles/constant.scss';

function isAuthenticated() {
  const tokenString = localStorage.getItem('authentication_token');
  return tokenString != null;
}

function App() {
  console.log(isAuthenticated());
  const PrivateRoute = ({ ...props }) =>
    isAuthenticated() ? <Route { ...props } /> : <Redirect to="/sign_in" />

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/home' component={AboutUs} exact />
          <Route path='/about_us' component={AboutUs} />
          <Route path='/sign_in' component={SignIn} />
          <Route path='/sign_up' component={SignUp} />
          <PrivateRoute path='/' component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
