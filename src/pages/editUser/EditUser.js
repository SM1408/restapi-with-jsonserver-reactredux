import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getSIngleUser, updatedUser } from '../../redux/action/action';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop:'20px',
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const EditUser = ()=>{
    const classes = useStyles();
    const [state, setState] =useState({
        name:'',
        email:'',
        contact:'',
          location:''
      
    })
    const [error , setError] = useState("");
    const { name, email, contact,location} = state
    let history = useHistory();
    let dispatch = useDispatch();
    let {id} = useParams();
    const {user} = useSelector(state=> state.dataReducer)

    const handleInputChange = (e) =>{
      let {name,value} = e.target;
      setState({...state , [name]:value})
    }

    const handleSubmit = (e)=>{
e.preventDefault();
if(!name || !contact ||!email  || !location){
    setError('Please inter all input field')
}else{
    dispatch(updatedUser(state,id));
    history.push('/');
    setError('')
}
    }

    useEffect(()=>{
        dispatch(getSIngleUser(id))
    },[])

    useEffect(()=>{
        if(user){
            setState({...user})
        }
    },[user])
  return (
      <div>
                <Button
                style={{width:'100px', marginTop:'50px'}}
                 variant="contained" color='secondary' 
                 onClick={()=>history.push('/')}
                 >Go Back</Button>

          <h2>Edit User</h2>
          {error && <h3 style={{color:'red'}}>{error}</h3>}
 <form className={classes.root} noValidate autoComplete="off" onSubmit ={handleSubmit}>
      <TextField id="standard-basic" label="name" value={name} name="name" type='text'
      onChange={handleInputChange}
      /> <br/>
      <TextField id="standard-basic" label="email" name="email" value={email} type='email' 
       onChange={handleInputChange}
      /><br/>
      <TextField id="standard-basic" label="contact" name="contact" value={contact} type='number'
       onChange={handleInputChange}
      /><br/>
      <TextField id="standard-basic" label="location" name="location" value={location} type='text'
       onChange={handleInputChange}
      /><br/>
      <Button 
                style={{width:'200px', marginTop:'20px'}}

      variant="contained" color='primary' type="submit">Submit</Button>

   
      
    </form>
      </div>
   
  );
}
export default EditUser;