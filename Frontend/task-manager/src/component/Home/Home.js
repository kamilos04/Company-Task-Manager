import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CheckIfProfileLoad from '../Logic/checkIfProfileLoad';

const Home = () => {
    // const dispatch=useDispatch()
    const auth = useSelector(store=>store.auth)
    const navigate = useNavigate()
  
    // useEffect(() => {
    //   dispatch(getProfile());
    // }, [dispatch]);
        
    // //If profile didnt download - go to /login
    // useEffect(() => {
    //     if(auth.fail === "profile" && auth.profile === null){
    //         navigate("/login")
    //     }
    // },[auth.fail])
    CheckIfProfileLoad()

    console.log(auth.profile)
    return (
    <div>
      <Navbar/>
        <div onClick={() => (navigate("/login"))}>Przycisk</div>
      {auth.profile?.tasks?.map((task) => (<div key={task.id}>{task.name}</div>))}
    </div>
  )
}

export default Home
