import './App.css';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>                           
      <Routes> 
        <Route path="/" element={<LoginScreen/>}/>
        <Route path="/signup" element={<CreateAccountScreen/>}/>
        <Route path="/home" element={<HomeScreen/>}/>
      </Routes>                    
    </Router>
  );
}

export default App;
