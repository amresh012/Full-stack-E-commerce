import { Suspense } from 'react'
import './App.css'
import AuthLayout from './Layout/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/AuthPages/Login'
import SignUp from './pages/AuthPages/SignUp'
import About from './pages/about/About'
import ForgotPassword from './pages/AuthPages/ForgotPassword'
import Otp from './pages/AuthPages/Otp'
import Contact from './pages/Home/Contact'
import ProductPage from './pages/Product/ProductPage'
import Bestsellers from './pages/Bestsellers'


function App() {

  return (
   <Suspense>

    <Routes>
      <Route element ={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/product" element={<ProductPage/>}/>
      <Route path="/bestsellers" element={<Bestsellers/>}/>

      </Route>


      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="Signup" element={<SignUp/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='otp' element={<Otp/>}/>
      </Route>
    </Routes>

   </Suspense>     
  )
}

export default App
