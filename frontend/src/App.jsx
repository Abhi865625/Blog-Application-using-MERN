import { useState, useEffect } from 'react'
import {getPosts, getPost, createPost, updatePost, deletePost} from './api'
import './App.css'

function App() {
  const [data, setData] = useState()

  useEffect(()=>{
    async function loadAllPosts(){
      let data = await getPosts()

      if(data){
        setData(data)
      }
    }
    loadAllPosts()

  },[])
  
  return (
    <>
      {JSON.stringify(data)}
    </>
  )
}

export default App
