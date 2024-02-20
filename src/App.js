import './App.css';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Module1 from './screens/modules/Module1';

function App() {
  return (
    <Router>                           
      <Routes> 
        <Route path="/" element={<LoginScreen/>}/>
        <Route path="/signup" element={<CreateAccountScreen/>}/>
        <Route path="/home" element={<HomeScreen/>}/>
        <Route path='/Module 1' element={<Module1/>}/>
      </Routes>                    
    </Router>
  );
}

export default App;
