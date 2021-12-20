import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Navbar from './components/Navbar';

import ContactState from './context/contact/ContactState';

const App =() => {
  return (
    <ContactState>
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
          </Routes>
        </div>
      </Fragment>
    </Router>
    </ContactState>
  );
}

export default App;
