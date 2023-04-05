import './App.css';
import useRoutes from './routes';
import React from 'react'


function App() {
  const rout = useRoutes()

  return (
    <>
      <div className="App">{ rout }</div>
    </>
  );
}

export default App;
