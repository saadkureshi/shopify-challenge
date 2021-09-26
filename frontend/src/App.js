import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import NavigationBar from './components/NavigationBar.jsx';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Login />
      <Register />
    </div>
  );
}

export default App;
