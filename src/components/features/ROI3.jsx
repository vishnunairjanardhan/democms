import React from "react";

const ResultsSection = () => {
    
  return (
    <section className="lg:p-16 border-t border-y border-white/5">
        <div className="py-6 bg-white h-[32rem] items-center rounded-lg mx-0 transition-shadow duration-300 flex flex-col">
          <p className="px-0 font-semibold text-2xl lg:float-left text-center text-black">
            Your inputs:
          </p>
          <div className="grid grid-cols-2 gap-12 px-6 float-left mt-8 lg:mr-auto w-full">
            <div className="col-span-1">
              <p className="px-2 text-black text-base text-left rounded-md">
                Annual Order
              </p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                3434
              </p>
            </div>
            <div>
              <p className="px-2 text-black text-base text-left rounded-md">
                Annual Order
              </p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                3434
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 px-6 float-left mt-6 lg:mr-auto w-full">
            <div className="col-span-1">
              <p className="px-2 text-black text-base text-left rounded-md">
                Annual Order
              </p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                3434
              </p>
            </div>
            <div>
              <p className="px-2 text-black text-base text-left rounded-md">
                Annual Order
              </p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                3434
              </p>
            </div>
          </div>
          <div className="grid float-left mt-8 lg:mr-auto px-6 relative">
            <p className="px-2 text-black text-base text-left rounded-md">
              Gross Margin
            </p>
            <p className="px-2 text-black text-base font-semibold rounded-md">
              10%-20%
            </p>
          </div>
          <div className="border-b"></div>
          <div className="mr-auto px-8 mt-6 w-full border-t">
            <p className="mt-6 text-base text-black">
              Current annual revenue generated
            </p>
            <p className="w-full mt-2 h-14 bg-vulcan-900 border lg:px-6 px-3 py-3 text-center text-white text-2xl font-semibold rounded-md">
              $22,34,234
            </p>
          </div>
        </div>
    </section>
  );
};

export default ResultsSection;
