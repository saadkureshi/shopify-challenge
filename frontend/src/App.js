import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import stylesheets
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import FileUpload from './components/FileUpload.jsx';
import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';

function App() {

  let currentUser = localStorage.getItem("user_details");
  let currentUserId = JSON.parse(localStorage.getItem("user_details"))?.id;
  let currentUserEmail = JSON.parse(localStorage.getItem("user_details"))?.email;

  return (
    <Router>
      <div className="App">
        <NavigationBar />
          <Switch>
            {currentUser ?
              <Route path="/feed">
                <FileUpload />
                <Feed />
              </Route>
              :
              <Route path="/">
                <Login />
                <Register />
              </Route>
            }
            {currentUser ?
              <Route path="/profile">
                <FileUpload />
                <Profile />
              </Route>
              :
              <Route path="/">
                <Login />
                <Register />
              </Route>
            }
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
      </div>
    </Router>

  );
}

export default App;
