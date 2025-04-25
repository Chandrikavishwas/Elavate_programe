import {useEffect, useState} from 'react';

function App(){
  const [sec, setSec] = useState(20);
  const [stopstart, setStopstart] = useState(true);

  useEffect(()=>{
    let time;
    if (stopstart) {
      time = setInterval(()=>{
        setSec(sec-1)
      },1000)
     }
     return ()=>{
      clearInterval(time)
     }
  },[sec,stopstart])
  useEffect(()=>{
    if (sec===0) {
      setStopstart(false)
    }
  },[sec,stopstart])

  return(
    
    <>  
    <div style={{alignItems:"center", marginLeft:"20%" }}>
      <h1>{sec}</h1>
      <br />
      <button onClick={()=>{setStopstart(!stopstart)}}>{stopstart ? "Stop" : "Start"}</button>
      <button onClick={()=>{setSec(20); setStopstart(false)}}>Reset</button>
    </div>
    </>
     )

}

export default App


































// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// export const App = () => {
//   const [data, setData] = useState([])
//   useEffect(()=>{
//     const getData= async()=>{
//       try {
//         const res = await axios.get('https://picsum.photos/v2/list?page=2&limit=10')
//         setData(res.data)
//       } catch (error) {
//         console.log(error)
//     }
//       }
//       getData()
//   },[])
//   return (
//     <div style={{display:"flex",flexWrap:"wrap"}}>
//       {data.map((elem,idx)=>(
//         <div key={idx}>
//           <img src={elem.download_url} style={{width:"200px"}} />
//           <h2>{elem.author}</h2>
//            </div>
//       ))}
//     </div>
//   )
// }
// export default App
