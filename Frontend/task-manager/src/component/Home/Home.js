import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch=useDispatch()
    const auth = useSelector(store=>store.auth)
    const navigate = useNavigate()
  
    useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);
        

    useEffect(() => {
        if(auth.fail === "profile" && auth.profile === null){
            navigate("/login")
        }
    },[auth.fail])

    console.log(auth.profile)
    return (
    <div>
        <div onClick={() => (navigate("/login"))}>Przycisk</div>
      {auth.profile?.tasks?.map((task) => (<div key={task.id}>{task.name}</div>))}
    </div>
  )
}

export default Home
