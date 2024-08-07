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
import CommercialGym from './pages/CommercialGym'
import Blog from './pages/Home/Blog'
import Dashboard from './pages/Admin/Dashboard'
import AdminLayout from './Layout/AdminLayout'
import Users from './pages/Admin/Users'
import Loader from "./components/reusablesUI/Loader"
import AddProduct from './pages/Admin/AddProduct'
import WebsitePage from './pages/Admin/WebsitePage'
import ListProduct from './pages/Admin/ListProduct'
import Contactus from "./pages/Admin/Contactus"
import Orders from './pages/Admin/Orders'
import Copoun from './pages/Admin/Copoun'
import CopounList from './pages/Admin/CopounList'
import AddBulkProduct from './pages/Admin/AddBulkProduct'
import BulkImage from './pages/Admin/BulkImage'
import ScrollToTop from "./essentials/ScrollToTop"

function App() {

  return (
   <Suspense fallback={<Loader/>}>
      <ScrollToTop/>
    <Routes>
      <Route element ={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/product" element={<ProductPage/>}/>
      <Route path="/bestsellers" element={<Bestsellers/>}/>
      <Route path="/commercial-gym" element={<CommercialGym/>}/>
      <Route path="/blog" element={<Blog/>}/>
      </Route>

      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="Signup" element={<SignUp/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='otp' element={<Otp/>}/>
      </Route>

      {/* Admin Routes */}

      <Route path="/admin/*" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="users" element={<Users/>}/>
      <Route path="products" element={<AddProduct/>}/>
      <Route path="bulk-product" element={<AddBulkProduct/>}/>
      <Route path="bulk-images" element={<BulkImage/>}/>
      <Route path="website" element={<WebsitePage/>}/>
      <Route path="product-list" element={<ListProduct/>}/>
      <Route path="contactus" element={<Contactus/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="coupon" element={<Copoun/>}/>
      <Route path="coupon-list" element={<CopounList/>}/>
      </Route>
    </Routes>
   </Suspense>     
  )
}

export default App
