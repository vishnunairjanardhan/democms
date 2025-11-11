import React from "react";
/**
 * PricingSection.jsx
 * Dynamically renders pricing tiers using config data
 * Works seamlessly with Astro using `client:load`
 */

export default function PricingSection({ config = pricingConfig }) {
  const { title, subtitle, description, pricingPlans, billingExample } = config || {};
  const { includedPasses = 0, overagePerPass = 0, exampleOverage = 0 } = billingExample || {};
  const total = (overagePerPass * exampleOverage).toFixed(2);

  return (
    <section className="relative bg-[#f9f9f9]">
      <div className="relative max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-12 lg:py-[72px]">
        
        {/* Section Header */}
        <div className="flex flex-col justify-center mb-8 text-center">
          <h2 className="font-medium">{title}</h2>
          <p className="mt-3 max-w-2xl mx-auto">{subtitle}</p>
          {/* Just Text */}
          <p className="text-gray-600 text-sm mt-2 max-w-3xl mx-auto">{description}</p>
        </div>
      </div>
    </section>
  );
}
