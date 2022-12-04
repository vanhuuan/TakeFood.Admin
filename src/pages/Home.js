import React, { useEffect } from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()
  useEffect(() => {
    const userName = localStorage.getItem("Name")
    if (userName) {
      navigate("/dashboard")
    }else{
      navigate("/login")
    }
  })
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
