import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import MyNavBar from './components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const {isAuthenticated} = useAuth0();
  return (
    <div data-testid="taskModal" className="App">
      {!isAuthenticated ? <MyNavBar  /> : null}
      <Home/>
    </div>
  )
}

export default App;
