import React,{useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context/Context';

const Event = () => {
  const context = useContext(Context);
  const check = () => {
    if(!context.token){
      alert("Please login first");
    }
  }
  check();
    return(
        <div>
          {context.token? <h1>Event</h1> : <Redirect to="/auth" />}
        </div>
    )
}

export default Event;