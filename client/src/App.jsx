import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Home from './components/Home';

function App() {

  return (
    <div data-testid="taskModal" className="App">
      <MyNavBar />
      <Home/>
    </div>
  )
}

export default App;
