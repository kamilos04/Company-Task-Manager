
import { ThemeProvider } from '@emotion/react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { lightTheme } from './component/Theme/LightTheme';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from './component/State/Authentication/Action';
import HomeRoute from './component/Routers/HomeRoute';

function App() {
  
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <div className="App">
        <HomeRoute/>
        <Navbar />
      </div>
    </ThemeProvider>

  );
}

export default App;
