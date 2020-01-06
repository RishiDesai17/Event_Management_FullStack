import React, { useContext } from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Auth from './pages/Auth';
import Booking from './pages/Bookings';
import Event from './pages/Events';
import Navbar from './components/Navbar';
import { Context } from './context/Context';

const App = (props) => {
  const context = useContext(Context);
  return(
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          {!context.token?<Redirect from="/" to="/auth" exact />:null}
          {context.token?<Redirect from="/" to="/event" exact />:null}
          {context.token?<Redirect from="/auth" to="/event" exact />:null}
          <Route path="/auth" component={Auth} />
          {/* {context.token? <div><Redirect from="/auth" to="/event" exact /> */}
          <Route path="/booking" component={Booking} />
          <Route path="/event" component={Event} />{/* </div>
           : <Redirect from="/event" to="/auth" exact/> } */}
          </Switch>
        
      </BrowserRouter>
    </div>
    
  );
}
export default App;
