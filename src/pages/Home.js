import React from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";

const Home = () => {
  let navigate = useNavigate()
  // const [isLogin, setIsLogin] = useState(false)
  let isLogin = false
  const userName = localStorage.getItem("Name")
  // const token = localStorage.getItem("AccessToken")

  if (userName) {
    isLogin = true
    navigate("/dashboard")
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
