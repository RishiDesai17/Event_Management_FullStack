import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Auth from './pages/Auth';
import Booking from './pages/Bookings';
import Event from './pages/Events';
import Navbar from './components/Navbar';

const App = (props) => {
  return(
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={Auth} />
          <Route path="/booking" component={Booking} />
          <Route path="/event" component={Event} />
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}
export default App;
