import { React, Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Profile from './components/Profile';
import MyEvents from './components/MyEvents';


class App extends Component{
  render(){
    return(
      <div className='app'>
      <Router>
        <Switch>
          <Route exact path='/' component={ Login } />
          <Route exact path='/register' component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/myevents' component={MyEvents} />
          <ProtectedRoute component={Dashboard} />
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App;
