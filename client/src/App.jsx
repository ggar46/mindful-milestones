import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Home from './components/Home';
import Goals from './components/Goals';

function App() {

  return (
    <div className="App">
      <MyNavBar />
      <Home/>
      <Goals/>
    </div>
  )
}

export default App;
