import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className="relative flex items-center justify-center w-full"
          >
            {/* Step Circle */}
            <div className="flex flex-col items-center relative z-10">
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

            {/* Line connector between steps */}
            {index < steps.length - 1 && (
              <div className="absolute top-1/2  -translate-y-3 left-24 right-0 h-1">
                <div
                  className={`h-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
