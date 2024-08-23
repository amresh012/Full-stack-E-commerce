import React, { useEffect, useState } from "react";
import bmiImg from "../../assets/bmi.jpg";
import { CiCalculator1 } from "react-icons/ci";

const BMICalculator = () => {
  const [isMetricUnit, setIsMetricUnit] = useState(true);
  const [isImperialUnit, setIsImperialUnit] = useState(false);

  const [result, setResult] = useState("");

  const [weightInKg, setWeightInKg] = useState();
  const [heightInCm, setHeightInCm] = useState();

  const [weightInLbs, setWeightInLbs] = useState();
  const [heightInFeet, setHeightInFeet] = useState();
  const [heightInInch, setHeightInInch] = useState();

  const changeUnitHandler = (e) => {
    setResult("");
    setWeightInKg();
    setHeightInCm();
    setWeightInLbs();
    setHeightInFeet();
    setHeightInInch();
    if (e.target.value === "metric_unit") {
      setIsMetricUnit(true);
      setIsImperialUnit(false);
    } else {
      setIsMetricUnit(false);
      setIsImperialUnit(true);
    }
  };

  const calculateBmiHandler = (e) => {
    e.preventDefault();

    if (isImperialUnit) {
      const result =
        (+weightInLbs * 703) / (+heightInFeet * 12 + +heightInInch) ** 2;
      setResult(`Your BMI is ${result.toFixed(1)}`);
    } else {
      const result = +weightInKg / (+heightInCm / 100) ** 2;
      setResult(`Your BMI is ${result.toFixed(1)}`);
    }
  };

  return (
    <div
      className="bg-[#144170] bg-blend-multiply bg-cover bg-center w-[full] h-[30rem] flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bmiImg})` }}
    >
      <div>
        <h1 className="uppercase text-center text-white text-2xl lg:text-4xl font-bold">
          BMI Calculator
        </h1>
        <div className="mx-auto mt-2 rounded-md h-[6px] w-[150px] bg-white mb-16"></div>
      </div>

      <div className="w-[65%] flex flex-col items-start justify-center">
        <div className="mb-3">
          <form className="flex items-center" onChange={changeUnitHandler}>
            <div className="flex items-center">
              <input
                className="text-xl bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                id="unit1"
                type="radio"
                name="group1"
                value="metric_unit"
              />
              <label className="font-thin text-xl text-white mr-3" for="unit1">
                Metric Units
              </label>
            </div>

            <div className="flex items-center">
              <input
                className="text-xl bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                id="unit2"
                type="radio"
                name="group1"
                value="imperial_unit"
              />
              <label className="font-thin text-xl text-white" for="unit2">
                Imperial Units
              </label>
            </div>
          </form>
        </div>

        <div>
          {isMetricUnit && (
            <form onSubmit={calculateBmiHandler} className="">
              <div>
                <input
                  className="font-thin text-xl text-white bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                  value={weightInKg}
                  onChange={(e) => setWeightInKg(e.target.value)}
                  type="number"
                  placeholder="Weight / kg"
                  pattern="^\d*(\.\d{0,2})?$"
                />
                <input
                  className="font-thin text-xl text-white bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                  value={heightInCm}
                  onChange={(e) => setHeightInCm(e.target.value)}
                  type="number"
                  placeholder="Height / cm"
                />
              </div>

              <button className="mt-4 uppercase text-lg lg:text-xl bg-white px-8 py-2 rounded-md font-semibold text-[#0c0c0cdb] hover:bg-[#b32995] hover:text-white duration-500 ease-in-out">
                <div className="flex items-center justify-center gap-x-1">
                  Calculate
                  <span className="pb-1">
                    <CiCalculator1 size={25} />
                  </span>
                </div>
              </button>
            </form>
          )}
          {isImperialUnit && (
            <form onSubmit={calculateBmiHandler} className="">
              <div>
                <input
                  className="font-thin text-xl text-white bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                  value={weightInLbs}
                  onChange={(e) => setWeightInLbs(e.target.value)}
                  type="number"
                  placeholder="Weight / lbs"
                  pattern="^\d*(\.\d{0,2})?$"
                />
                <input
                  className="font-thin text-xl text-white bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                  value={heightInFeet}
                  onChange={(e) => setHeightInFeet(e.target.value)}
                  type="number"
                  placeholder="Height / feet"
                />
                <input
                  className="font-thin text-xl text-white bg-transparent outline-none border rounded-md px-3 py-2 text-lg mx-1 my-1 cursor-pointer"
                  value={heightInInch}
                  onChange={(e) => setHeightInInch(e.target.value)}
                  type="number"
                  placeholder="Height / inch"
                />
                <button
                  type="submit"
                  className="mt-4 uppercase text-lg lg:text-xl bg-white px-8 py-2 rounded-md font-semibold text-[#0c0c0cdb] hover:bg-[#b32995] hover:text-white duration-500 ease-in-out"
                >
                  <div className="flex items-center justify-center gap-x-1">
                    Calculate
                    <span className="pb-1">
                      <CiCalculator1 size={25} />
                    </span>
                  </div>
                </button>
              </div>
            </form>
          )}

          {result && (
            <div className="mt-3 text-white text-xl font-light">{result}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
