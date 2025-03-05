import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Router from './components/Router';
import RouteTree from './components/Router';


function App() {
  return (
    <div className="App">
       <div className="App">
        <Header/>
        <RouteTree />
        {/* <Login/> */}
        {/* <Register /> */}
    </div>
    </div>
  );
}

export default App;
