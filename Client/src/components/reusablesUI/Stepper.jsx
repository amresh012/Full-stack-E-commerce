import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className="flex-1 relative flex  flex-col items-center justify-center"
          >
            {/* Line connector between steps */}
            {index > 0 && (
              <div
                className={`absolute top-0 left-0 w-full h-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-black'
                } transform translate-y-1/2 -z-10`}
              />
            )}

            {/* Step Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition duration-300 ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : isActive
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>

            {/* Step Label */}
            <span className="mt-2 text-center text-xs sm:text-sm">
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
