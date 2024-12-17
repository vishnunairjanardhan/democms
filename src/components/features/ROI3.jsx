import React from "react";

const ResultsSection = () => {
  return (
    <section className="lg:p-16 border-t border-y border-white/5">
      <div className="2xl:px-16 md:px-0 px-6 sm:px-4 mx-auto max-w-7xl">
        <p className="text-2xl font-bold text-white">Results</p>
        <p className="mt-2 text-sm">
          Here’s a look at how loyalty and referrals can help you improve AOV,
          repeat purchases, LTV, and acquisition on
        </p>
      </div>

      <div className="flex lg:flex-row flex-col items-stretch grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto max-w-7xl py-12 2xl:px-16 md:px-0 px-6 sm:px-4 w-full">
        {/* Link and code management section */}
        <div className="py-0 lg:max-w-4xl col-span-1 lg:col-span-2 border border-vulcan-700 bg-white rounded-lg mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          <div className="bg-[#202130] bg-cover px-10 rounded-tr-md rounded-br-md grid lg:grid-cols-2 gap-4 py-8">
            <div className="col-span-1 mt-6 py-5 rounded-lg text-center border border-white/60">
              <p className="mt-2 px-2 item-center text-sm">
                Incremental revenue lift with 99minds Loyalty & Referrals
              </p>
              <p className="mt-2 text-[26px] text-center font-bold text-white">
                $2,493,006 - $4,975,028
              </p>
            </div>
            <div className="mt-6 py-5 rounded-lg text-center bg-vulcan-800">
              <p className="mt-2 px-2 item-center text-sm">
                Total projected annual revenue with 99minds Loyalty & Referrals
              </p>
              <p className="mt-2 text-[26px] text-center font-bold text-white">
                $2,493,006 - $4,975,028
              </p>
            </div>
          </div>

          <div>
            <div className="grid mt-6 grid-cols-4 gap-2 px-4 py-2">
              <div className="col-span-2"></div>
              <div className="flex flex-inline lg:gap-12 gap-7 lg:pl-14 pl-3 lg:float-right lg:ml-auto py-2">
                <p className="w-32 text-md text-center text-black rounded-md">
                  Lower End
                </p>
                <p className="w-32 text-md text-center text-black rounded-md">
                  High End
                </p>
              </div>
            </div>

            {/* Repeatable Orders Section */}
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="shadow-lg border mt-6 rounded-lg p-4"
                >
                  <div className="grid grid-cols-4 gap-1 lg:px-4 py-2">
                    <div className="col-span-2">
                      <p className="font-semibold text-black">
                        Your annual orders
                      </p>
                      <p className="text-sm">
                        How many orders does your brand process per year?
                      </p>
                    </div>
                    <div className="grid">
                      <div className="flex flex-inline items-center lg:gap-12 gap-2 lg:pl-14 pl-2 lg:float-right lg:ml-auto">
                        <p className="lg:w-32 h-14 bg-vulcan-900 border lg:px-6 px-3 py-3 text-center text-white rounded-md">
                          3434
                        </p>
                        <p className="lg:w-32 h-14 bg-vulcan-900 border lg:px-6 px-3 py-3 text-center text-white rounded-md">
                          3434
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

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
      </div>
    </section>
  );
};

export default ResultsSection;
