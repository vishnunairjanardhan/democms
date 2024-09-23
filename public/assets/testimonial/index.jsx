import React from "react";

export const Element = () => {
  return (
    <div className="relative w-[1290px] h-[533px] bg-white rounded-[32px] overflow-hidden [background:linear-gradient(180deg,rgb(217,205,255)_0%,rgb(196.86,178.5,255)_100%)]">
      <img className="absolute w-[578px] h-[389px] top-[72px] left-[640px]" alt="Rectangle" src="assets/testimonial/Rectangle 1.png" />
      <div className="flex flex-col w-[472px] items-start gap-14 absolute top-[200px] left-12">
        <div className="inline-flex items-center gap-12 relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal]">
              $300K
            </div>
            <div className="relative w-[212px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#303030] text-lg tracking-[0] leading-[normal]">
              In Gift Card Sales
            </div>
          </div>
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal]">
              30 Days
            </div>
            <div className="relative w-[212px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#303030] text-lg tracking-[0] leading-[normal]">
              Time Period
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal]">
              23%
            </div>
            <p className="relative w-[212px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#303030] text-lg tracking-[0] leading-[normal]">
              Percentage of Gift Cards in total Sales
            </p>
          </div>
          <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-[40px] tracking-[0] leading-[normal]">
              23%
            </div>
            <p className="relative w-[212px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#303030] text-lg tracking-[0] leading-[normal]">
              Percentage of Gift Cards in total Sales
            </p>
          </div>
        </div>
      </div>
      <img className="absolute w-[179px] h-10 top-[72px] left-12" alt="Group" src="assets/testimonial/Group.svg" />
    </div>
  );
};
