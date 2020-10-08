import React from 'react';
import Header from './Header/Header';
import './App.css';

function App() {
  const [currWindow, setWindow] = React.useState<string>('pre');
  
  const handleChangeWindow = (newWindow:string) => {
    setWindow(newWindow);
  };

  return (
    <div className="App">
      <Header currentWindow={currWindow} handleChange={handleChangeWindow}/>
    </div>
  );
}

export default App;
