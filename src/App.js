import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Navbar from './Pages/Navbar';



function App() {
  return (
    <div className="App">
      <Router>     
          <Routes>
            <Route path="/" element={<Navbar />}> 
              <Route path="/Home" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Registration" element={<Registration />} />
          </Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
