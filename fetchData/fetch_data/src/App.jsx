import { useState ,useEffect } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res =>{
      setData(res.data)
    })
    .catch(err=>console.log(err))
  })
    return (
    <>
      {!toggle && <button onClick={()=>setToggle(true)}>Get Data</button>}
      { toggle &&
        data.map(res =>{
          return <div key={res.id}>{res.id}  {res.title}</div>
        })
      }
          
    </>
  )
}

export default App
