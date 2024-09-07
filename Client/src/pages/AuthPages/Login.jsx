import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiMail, CiPhone } from "react-icons/ci";
import { toast, Toaster } from "react-hot-toast";
import { adduser } from "../../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";

const Login = () => {
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const loginWithEmail = async () => {
    try {
      const res = await axios.post(`${base_url}user/login`, formData);

      localStorage.setItem("token", res.data.token);

      if (res.status === 200) {
        dispatch(adduser(formData));
        if (res.data.role === "admin") {
          toast.success("Admin Login Success");
          navigate("/admin");
        } else {
          toast.success("Login Success");
          navigate("/profile");
        }
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const loginWithMobile = async () => {
    if (formData.mobile.length > 10 || formData.mobile.length < 10) {
      toast.error("Mobile no. must be 10 digits long");
      return;
    }
    try {
      const res = await axios.post(
        `${base_url}user/login-with-mobile`,
        formData
      );
      if(!res.data.success){
        throw new Error(res.data.message);
      }

      toast.success(res.data.message);
      navigate('/otp', {state: {mobile: formData.mobile}});
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginWithPhone) {
      loginWithEmail();
    } else {
      loginWithMobile();
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex lg:mt-12 items-around justify-center lg:p-0 p-2 overflow-clip">
        <div className="image relative hidden lg:block">
          <img
            src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid"
            alt=""
          />
          <div className="absolute flex items-center justify-center bg-black/40 top-0 h-full w-full text-white">
            <h1 className="flex flex-col items-center justify-center text-center">
              <p className="text-[3rem] font-bold">
                Build your dream gym with us
              </p>
              <p className="text-[1.5rem]">Ultimate Fitness Equipment Brand</p>
            </h1>
          </div>
        </div>
        <div className="bg-[#0A2440] text-white p-8 w-[30rem] space-y-4  shadow-sm lg:shadow-none">
          <div className="flex flex-col items-center justify-center mt-4">
            <h1 className="text-4xl font-bold">SignIn</h1>
            <p className="text-xs">or use your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            {!loginWithPhone && (
              <div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative flex max-h-fit">
                    <div className="flex items-center justify-center text-xl w-12  bg-[#144170] text-white">
                      <CiMail />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border outline-none text-black"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 max-h-fit">
                  <label
                    className="block mb-2 text-sm font-bold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative flex">
                    <div className="flex items-center justify-center text-xl w-12  bg-[#144170] text-white text-white">
                      <IoLockClosedOutline />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border outline-none text-black"
                      required
                    />
                  </div>
                  <div className="py-2">
                    <Link to="/forgot-password">
                      <p>Forgot Password?</p>
                    </Link>
                  </div>

                </div>
              </div>
            )}
            {loginWithPhone && (
              <div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold"
                    htmlFor="email"
                  >
                    Phone no.
                  </label>
                  <div className="relative flex max-h-fit">
                    <div className="flex items-center justify-center text-xl w-12  bg-[#144170] text-white text-white">
                      <CiPhone />
                    </div>
                    <input
                      type="number"
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border outline-none text-black"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white p-2 rounded-md duration-300"
            >
              SignIn
            </button>
            {!loginWithPhone && (
              <button
                onClick={() => setLoginWithPhone(true)}
                type="button"
                className="mt-2 w-full bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white p-2 rounded-md duration-300"
              >
                Login With Phone No.
              </button>
            )}
            {loginWithPhone && (
              <button
                onClick={() => setLoginWithPhone(false)}
                type="button"
                className="mt-2 w-full bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white p-2 rounded-md duration-300"
              >
                Login With Email Id
              </button>
            )}
          </form>
          <div className="flex items-center w-full gap-2 justify-center lg:p-4">
            <p>Dont have an account?</p>
            <Link to="/signup">
              <p className="text-[#038CCC] underline">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
