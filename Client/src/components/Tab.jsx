import  { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Equip1 , Equip2 ,Equip3} from "../assets/images";
import AOS from "aos";
import "aos/dist/aos.css";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("London");

  const openCity = (cityName) => {
    setActiveTab(cityName);
    };
    
    useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);

  return (
    <div className="flex  justify-center flex-row-reverse w-full p-12 gap-12 mb-4">
      {/* Tab Buttons */}
      <div className="flex flex-col w-1/2  gap-12  cursor-pointer  ">
        <div
          className={`p-6  flex items-center gap-2 text-left font-semibold border-l-8  ${
            activeTab === "London" ? "border-blue-800 duration-1000" : ""
          }`}
          onClick={() => openCity("London")}
          data-aos="zoom-out"
        >
          {/* <div className="image p-2">
                      <img src={Equip3} alt="" className="h-24 "/>
                  </div> */}
          <div className="">
            <h1 className="text-2xl">World Class Equipment</h1>
            <p className="font-normal text-sm tracking-wide">
              Find the right fit at any price point – sourced from the world’s
              best suppliers
            </p>
          </div>
        </div>
        <div
          className={`py-5 px-4 text-left font-semibold border-l-8 ${
            activeTab === "Paris"
              ? "border-blue-800 duration-1000"
              : "hover:bg-gray-200"
          }`}
          onClick={() => openCity("Paris")}
          data-aos="zoom-out"
        >
          <h1 className="text-2xl">All India Hassle free service</h1>
          <p className="font-normal text-sm tracking-wide">
            Installation network across 19k+ pincodes
          </p>
        </div>
        <div
          className={`py-5 px-4 text-left font-semibold  border-l-8     ${
            activeTab === "Tokyo"
              ? "border-blue-800 duration-500"
              : "hover:bg-gray-200"
          }`}
          onClick={() => openCity("Tokyo")}
          data-aos="zoom-out"
        >
          <h1 className="text-2xl">Sales & demand support</h1>
          <p className="font-normal text-sm tracking-wide">
            Pre-sales and demand management support through cult marketing
          </p>
        </div>
        {/* copy */}
        <div
          className={`py-5 px-4 text-left font-semibold  border-l-8     ${
            activeTab === "Mumbia"
              ? "border-blue-800 duration-500"
              : "hover:bg-gray-200"
          }`}
          onClick={() => openCity("Mumbia")}
          data-aos="zoom-out"
        >
          <h1 className="text-2xl">Sales & demand support</h1>
          <p className="font-normal text-sm tracking-wide">
            Pre-sales and demand management support through cult marketing
          </p>
        </div>

        {/* button */}
        <div
          data-aos="fade-in"
          className="button flex items-center gap-2 bg-blue-800 p-4 text-xl font-bold text-white w-2/3 shadow-md"
        >
          <button>Get In Touch</button>
          <IoIosArrowRoundForward size={30} />
        </div>
      </div>

      {/* Tab Content */}
      <div className=" w-1/2 p-4" data-aos="flip-in" data-aos-duration={100000}>
        {activeTab === "London" && (
          <div className="bg-slate-300/20 rounded-md shadow-sm h-full flex flex-wrap gap-4 items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <>
                <img
                  src={Equip1}
                  alt=""
                  className="h-44 w-44"
                  key={i}
                  data-aos="zoom-out"
                  data-aos-duration={Math.random() * 4000}
                />
                <img
                  src={Equip2}
                  alt=""
                  className="h-44 w-44"
                  key={i}
                  data-aos="zoom-out"
                  data-aos-duration={Math.random() * 4000}
                />
              </>
            ))}
          </div>
        )}
        {activeTab === "Paris" && (
          <div className="shadow-2xl">
            <img src="/Figma.png" alt="" className="backdrop-filter" />
          </div>
        )}
        {activeTab === "Tokyo" && (
          <div>
            <h3 className="text-xl font-bold">Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
          </div>
        )}
        {activeTab === "Mumbia" && (
          <div>
            <h3 className="text-xl font-bold">Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
