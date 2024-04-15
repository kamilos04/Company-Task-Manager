import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../State/Authentication/Action';

const Home = () => {
    const dispatch=useDispatch()
    const auth = useSelector(store=>store.auth)
  
    useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);
        
    console.log(auth.profile)
    return (
    <div>
      {auth.profile?.tasks?.map((task) => (<div key={task.id}>{task.name}</div>))}
    </div>
  )
}

export default Home
