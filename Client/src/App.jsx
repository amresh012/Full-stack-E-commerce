import { Suspense } from 'react'
import './App.css'
import AuthLayout from './Layout/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Login from './pages/AuthPages/Login'
import SignUp from './pages/AuthPages/SignUp'
import About from './pages/about/About'
import ForgotPassword from './pages/AuthPages/ForgotPassword'
import Otp from './pages/AuthPages/Otp'
import Contact from './pages/Home/Contact'
import ProductPage from './pages/Product/ProductPage'
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
import HomePage from './pages/Home/HomePage'
import ProductdetailPage from './pages/Product/ProductdetailPage'
import {Privacy, Policies ,RefundPolicy,TermsAndConditions ,PaymentsPolicy ,ShippingPolicy,ReturnPolicy, } from './pages/policies'
import Setting from './pages/UserDashboard/Setting'
import UserProfile from './Layout/UserProfile'
import Shipping from './pages/UserDashboard/Shipping'
import Invoice from './pages/UserDashboard/Invoice'
import CheckOut from './pages/Product/CheckOut'
import AdminBlog from './pages/Admin/blog'
import ResetPassword from './pages/AuthPages/ResetPassword'
import MyOrders from "./pages/UserDashboard/MyOrders"
import Report from './pages/UserDashboard/Report'
import Profile from "./pages/UserDashboard/Profile"
import BlogView from './pages/Home/BlogView'
import Category from './pages/Home/Category'
import ProductEdit from './pages/Product/ProductEditPage'
function App() {

  return (
   <Suspense fallback={<Loader/>}>
      
    <Routes>
      <Route element ={<Layout/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/product" element={<ProductPage/>}/>
      <Route path="/product/:id" element={<ProductdetailPage/>}/>
      <Route path="/product-category/*" element={<Category />}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/commercial-gym" element={<CommercialGym/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/blog/:id" element={<BlogView/>}/>
      <Route path="/policies/*" element={<Policies/>}>
      <Route path='privacy-policy' element = {<Privacy/>}/>
      <Route path='refund-policy' element = {<RefundPolicy/>}/>
      <Route path='payment-policy' element = {<PaymentsPolicy/>}/>
      <Route path='terms&conditions' element = {<TermsAndConditions/>}/>
      <Route path='shipping-policy' element = {<ShippingPolicy/>}/>
      <Route path='return-policy' element = {<ReturnPolicy/>}/>
      </Route>
      </Route>

      {/* Auth Routes */}
      <Route path="/*" element={<AuthLayout/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="Signup" element={<SignUp/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='reset-password' element ={<ResetPassword/>}/>
        <Route path='otp' element={<Otp/>}/>
      </Route>
      
       {/* UserDashboard Routes */}
         <Route path="/profile" element={<UserProfile/>}>
         <Route index element={<Profile/>}/>
         <Route path="setting" element={<Setting/>}/>
         <Route path="shipping-add" element={<Shipping/>}/>
         <Route path="my-invoice" element={<Invoice/>}/>
         <Route path="my-orders" element={<MyOrders/>}/>
         <Route path="report" element={<Report/>}/>
         </Route>
     

      {/* Admin Routes */}

      <Route path="/admin/*" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="users" element={<Users/>}/>
      <Route path="products" element={<AddProduct/>}/>
      <Route path="product-edit/:id" element={<ProductEdit/>}/>
      <Route path="bulk-product" element={<AddBulkProduct/>}/>
      <Route path="bulk-images" element={<BulkImage/>}/>
      <Route path="website" element={<WebsitePage/>}/>
      <Route path="product-list" element={<ListProduct/>}/>
      <Route path="contactus" element={<Contactus/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="coupon" element={<Copoun/>}/>
      <Route path="coupon-list" element={<CopounList/>}/>
      <Route path="blog" element={<AdminBlog/>}/>
      </Route>
    </Routes>
   </Suspense>     
  )
}

export default App
