
import { ThemeProvider } from '@emotion/react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { lightTheme } from './component/Theme/LightTheme';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from './component/State/Authentication/Action';

function App() {
  const dispatch=useDispatch()
  const auth = useSelector(store=>store.auth)

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  
  console.log(auth.profile)
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <div className="App">
        <Navbar />
      </div>
      {/* {auth.profile?.tasks?.map((task) => (<div key={task.id}>{task.name}</div>))} */}
    </ThemeProvider>

  );
}

export default App;
