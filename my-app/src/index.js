import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Note from './Note.jsx';
import notes from './notes.js'


ReactDOM.render(
  <div>
    <Header/>
      {notes.map(attributes => (
        <Note
          key={attributes.key}
          title={attributes.title}
          content={attributes.content}
        />
      ))}
    <Footer/>
  </div>,
  document.getElementById('root')
);
