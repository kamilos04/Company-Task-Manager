import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../State/Authentication/Action';

export default function CheckIfProfileLoad(){
    const dispatch=useDispatch()
    const auth = useSelector(store=>store.auth)
    const navigate = useNavigate()
  
    useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);
        
    //If profile didnt download - go to /login
    useEffect(() => {
        if(auth.fail === "profile" && auth.profile === null){
            navigate("/login")
        }
    },[auth.fail])
}