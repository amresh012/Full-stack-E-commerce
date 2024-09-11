import { Suspense } from 'react';
import './App.css';
import AuthLayout from './Layout/AuthLayout';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './pages/AuthPages/Login';
import SignUp from './pages/AuthPages/SignUp';
import About from './pages/about/About';
import ForgotPassword from './pages/AuthPages/ForgotPassword';
import Otp from './pages/AuthPages/Otp';
import Contact from './pages/Home/Contact';
import ProductPage from './pages/Product/ProductPage';
import CommercialGym from './pages/CommercialGym';
import Blog from './pages/Home/Blog';
import Dashboard from './pages/Admin/Dashboard';
import AdminLayout from './Layout/AdminLayout';
import Users from './pages/Admin/Users';
import Loader from './components/reusablesUI/Loader';
import AddProduct from './pages/Admin/AddProduct';
import WebsitePage from './pages/Admin/WebsitePage';
import ListProduct from './pages/Admin/ListProduct';
import Contactus from './pages/Admin/Contactus';
import Orders from './pages/Admin/Orders';
import Copoun from './pages/Admin/Copoun';
import CopounList from './pages/Admin/CopounList';
import AddBulkProduct from './pages/Admin/AddBulkProduct';
import BulkImage from './pages/Admin/BulkImage';
import HomePage from './pages/Home/HomePage';
import ProductdetailPage from './pages/Product/ProductdetailPage';
import {
  Privacy,
  Policies,
  RefundPolicy,
  TermsAndConditions,
  PaymentsPolicy,
  ShippingPolicy,
  ReturnPolicy,
} from './pages/policies';
import Setting from './pages/UserDashboard/Setting';
import UserProfile from './Layout/UserProfile';
import Shipping from './pages/UserDashboard/Shipping';
import Invoice from './pages/UserDashboard/Invoice';
import CheckOut from './pages/Product/CheckOut';
import AdminBlog from './pages/Admin/blog';
import ResetPassword from './pages/AuthPages/ResetPassword';
import MyOrders from './pages/UserDashboard/MyOrders';
import Report from './pages/UserDashboard/Report';
import Profile from './pages/UserDashboard/Profile';
import BlogView from './pages/Home/BlogView';
import Category from './pages/Home/Category';
import ProductEdit from './pages/Product/ProductEditPage';
import ListBlogs from './pages/Admin/ListBlogs';
import EditBlog from './pages/Admin/EditBlog';
import Confirmation from './pages/Product/Confirmation';
import ErrorBoundary from './ErrorBoundary'; // Use ErrorBoundary directly

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Layout Routes */}
        <Route
          element={
            <ErrorBoundary>
              <Layout />
            </ErrorBoundary>
          }
        >
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
            }
          />
          <Route
            path="/contact"
            element={
              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
            }
          />
          <Route
            path="/product"
            element={
              <ErrorBoundary>
                <ProductPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ErrorBoundary>
                <ProductdetailPage />
              </ErrorBoundary>
            }
          />
          <Route
            path="/product-category/*"
            element={
              <ErrorBoundary>
                <Category />
              </ErrorBoundary>
            }
          />
          <Route
            path="/checkout"
            element={
              <ErrorBoundary>
                <CheckOut />
              </ErrorBoundary>
            }
          />
          <Route
            path="/order-confirmed"
            element={
              <ErrorBoundary>
                <Confirmation />
              </ErrorBoundary>
            }
          />
          <Route
            path="/commercial-gym"
            element={
              <ErrorBoundary>
                <CommercialGym />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog"
            element={
              <ErrorBoundary>
                <Blog />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <ErrorBoundary>
                <BlogView />
              </ErrorBoundary>
            }
          />
          <Route
            path="/policies/*"
            element={
              <ErrorBoundary>
                <Policies />
              </ErrorBoundary>
            }
          >
            <Route
              path="privacy-policy"
              element={
                <ErrorBoundary>
                  <Privacy />
                </ErrorBoundary>
              }
            />
            <Route
              path="refund-policy"
              element={
                <ErrorBoundary>
                  <RefundPolicy />
                </ErrorBoundary>
              }
            />
            <Route
              path="payment-policy"
              element={
                <ErrorBoundary>
                  <PaymentsPolicy />
                </ErrorBoundary>
              }
            />
            <Route
              path="terms&conditions"
              element={
                <ErrorBoundary>
                  <TermsAndConditions />
                </ErrorBoundary>
              }
            />
            <Route
              path="shipping-policy"
              element={
                <ErrorBoundary>
                  <ShippingPolicy />
                </ErrorBoundary>
              }
            />
            <Route
              path="return-policy"
              element={
                <ErrorBoundary>
                  <ReturnPolicy />
                </ErrorBoundary>
              }
            />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route
          element={
            <ErrorBoundary>
              <AuthLayout />
            </ErrorBoundary>
          }
        >
          <Route
            path="login"
            element={
              <ErrorBoundary>
                <Login />
              </ErrorBoundary>
            }
          />
          <Route
            path="signup"
            element={
              <ErrorBoundary>
                <SignUp />
              </ErrorBoundary>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ErrorBoundary>
                <ForgotPassword />
              </ErrorBoundary>
            }
          />
          <Route
            path="reset-password"
            element={
              <ErrorBoundary>
                <ResetPassword />
              </ErrorBoundary>
            }
          />
          <Route
            path="otp"
            element={
              <ErrorBoundary>
                <Otp />
              </ErrorBoundary>
            }
          />
        </Route>

        {/* User Dashboard Routes */}
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <UserProfile />
            </ErrorBoundary>
          }
        >
          <Route
            index
            element={
              <ErrorBoundary>
                <Profile />
              </ErrorBoundary>
            }
          />
          <Route
            path="setting"
            element={
              <ErrorBoundary>
                <Setting />
              </ErrorBoundary>
            }
          />
          <Route
            path="shipping-add"
            element={
              <ErrorBoundary>
                <Shipping />
              </ErrorBoundary>
            }
          />
          <Route
            path="my-invoice"
            element={
              <ErrorBoundary>
                <Invoice />
              </ErrorBoundary>
            }
          />
          <Route
            path="my-orders"
            element={
              <ErrorBoundary>
                <MyOrders />
              </ErrorBoundary>
            }
          />
          <Route
            path="report"
            element={
              <ErrorBoundary>
                <Report />
              </ErrorBoundary>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ErrorBoundary>
              <AdminLayout />
            </ErrorBoundary>
          }
        >
          <Route
            index
            element={
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            }
          />
          <Route
            path="users"
            element={
              <ErrorBoundary>
                <Users />
              </ErrorBoundary>
            }
          />
          <Route
            path="products"
            element={
              <ErrorBoundary>
                <AddProduct />
              </ErrorBoundary>
            }
          />
          <Route
            path="product-edit/:id"
            element={
              <ErrorBoundary>
                <ProductEdit />
              </ErrorBoundary>
            }
          />
          <Route
            path="bulk-product"
            element={
              <ErrorBoundary>
                <AddBulkProduct />
              </ErrorBoundary>
            }
          />
          <Route
            path="bulk-images"
            element={
              <ErrorBoundary>
                <BulkImage />
              </ErrorBoundary>
            }
          />
          <Route
            path="website"
            element={
              <ErrorBoundary>
                <WebsitePage />
              </ErrorBoundary>
            }
          />
          <Route
            path="product-list"
            element={
              <ErrorBoundary>
                <ListProduct />
              </ErrorBoundary>
            }
          />
          <Route
            path="contactus"
            element={
              <ErrorBoundary>
                <Contactus />
              </ErrorBoundary>
            }
          />
          <Route
            path="orders"
            element={
              <ErrorBoundary>
                <Orders />
              </ErrorBoundary>
            }
          />
          <Route
            path="coupon"
            element={
              <ErrorBoundary>
                <Copoun />
              </ErrorBoundary>
            }
          />
          <Route
            path="coupon-list"
            element={
              <ErrorBoundary>
                <CopounList />
              </ErrorBoundary>
            }
          />
          <Route
            path="blog"
            element={
              <ErrorBoundary>
                <AdminBlog />
              </ErrorBoundary>
            }
          />
          <Route
            path="blog-list"
            element={
              <ErrorBoundary>
                <ListBlogs />
              </ErrorBoundary>
            }
          />
          <Route
            path="blog-edit/:id"
            element={
              <ErrorBoundary>
                <EditBlog />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
