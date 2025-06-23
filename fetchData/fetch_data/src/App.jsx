import { useState, useEffect } from "react";
import './App.css'

function App(){

      const [data, setData] = useState([])

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/albums`)
    .then((res)=>res.json())
    .then((data)=>setData(data))
    .catch((err)=>console.log(err))
  })
  return(<>
        {data.map((el)=>{
          return(<div key={el.id}>
                  {el.id} {el.title}
          </div>)
        })}
  </>)
}


export default App;

