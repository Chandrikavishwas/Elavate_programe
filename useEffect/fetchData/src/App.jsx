import { useState ,useEffect } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res =>{
      setData(res.data)
    })
    .catch(err=>console.log(err))
  })
    return (
    <>
      {
        data.map(res =>{
          return <div key={res.id}>{res.id}  {res.title}</div>
        })
      }
      <button onClick={() =>{setData(data+1)}}>Click</button>
    </>
  )
}

export default App
