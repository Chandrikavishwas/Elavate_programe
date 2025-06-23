import {useState} from 'react';
import './App.css';

function App(){
  const [count, setCount] = useState(0);
  return(
    <>
      <div>
        <h2> {count} </h2>
        <button onClick= {()=>{setCount(count+1)}} >Increase</button>
        <button onClick = {()=>{setCount(count-1)}} disabled={count==0}>Decrease</button>
        <button onClick = {()=>{setCount(0)}} >Reset</button>
      </div>
    </>

  )
}

export default App

