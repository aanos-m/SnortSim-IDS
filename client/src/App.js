import './App.css';
import LoginForm from './components/Login/LoginForm';
import Header from './components/Utils/Header';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header/>
      <LoginForm/>
    </div>
  );
}

export default App;
