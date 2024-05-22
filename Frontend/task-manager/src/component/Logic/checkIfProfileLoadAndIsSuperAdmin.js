import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile} from '../State/Authentication/Action';

export default function CheckIfProfileLoadAndIsSuperAdmin(){
    const dispatch=useDispatch()
    const auth = useSelector((store)=>store.auth)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(localStorage.getItem("jwt")){
            dispatch(fetchProfile())
        }
        else{
            navigate("/login")
        }
      
    }, [dispatch]);
        
    //If profile didnt download - go to /login
    useEffect(() => {
        if(auth.fail === "profile" && auth.profile === null){
            navigate("/login")
        }
    },[auth.fail])

    useEffect(() => {
        if (auth.success==="profile" && auth.profile?.role !== "SUPER_ADMIN") {
          navigate("/")
        }
    
      }, [auth.success])
}

