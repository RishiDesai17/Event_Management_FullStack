import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Context } from '../context/Context';

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
    },
    avatar: {
      backgroundColor: "black",
    },
    form: {
      width: '100%'
    },
  }));

const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [login,setLogin] = useState(true);
    const classes = useStyles();
    const context = useContext(Context);
    let body;
    if(login){
        body={
            query: `
                query{
                    login(email: "${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiry
                    }
                }
            `
        }
    }
    else{
        body={
            query: `
                mutation{
                    createUser(userInput:{email: "${email}",password:"${password}"}){
                        _id
                        email
                    }
                }
            `
        }
    }

    const submit = async () => {
        // try{
        //     const response = await fetch('http://localhost:3300/graphql', {
        //         method: 'POST',
        //         body: JSON.stringify(body),
        //         headers:{
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     const resData = await response.json();
        //     console.log(resData);
        //     //console.log(resData.errors[0].message)
        // }
        // catch(err){
        //     console.log(err);
            
        // }
        context.login(body);
    }

    return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{marginTop: '33%'}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {login?<Typography style={{marginBottom: 30}} component="h1" variant="h5">
          Login
        </Typography>:
        <Typography style={{marginBottom: 30}} component="h1" variant="h5">
          Sign Up
        </Typography>}
        <form className={classes.form} noValidate>
          <TextField
                label="Email"
                required
                fullWidth
                variant="outlined"
                onChange={(event)=>setEmail(event.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event)=>setPassword(event.target.value)}
            style={{marginBottom: 20}}
          />
          {login ? <Button
            style={{width: 100,margin: 20, backgroundColor: 'black'}}
            variant="contained"
            onClick={submit}
          >
            <Typography style={{color: 'white'}}>Login</Typography>
          </Button> :
          <Button
            style={{width: 100,margin: 20, backgroundColor: 'black'}}
            variant="contained"
            onClick={submit}
          >
            <Typography style={{color: 'white'}}>Signup</Typography>
          </Button>}
        </form>
        {login ? <span>Don't have an account?...<Link onClick={()=>{setLogin(false)}}>SIGN UP</Link></span> : 
          <span>Have an account?...<Link onClick={()=>{setLogin(true)}}>LOGIN</Link></span>  }
      </div>
      <p>{context.token}</p>
    </Container>
    )
}

export default Auth;