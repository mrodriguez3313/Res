import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Note from './Note.jsx';

ReactDOM.render(
  <div>
    <Header/>
      <Note/>
    <Footer/>
  </div>,
  document.getElementById('root')
);
