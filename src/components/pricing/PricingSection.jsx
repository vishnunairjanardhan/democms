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

        {/* Pricing Cards */}
        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {pricingPlans?.map((plan, i) => (
            <div
              key={i}
              className={`bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col transition hover:shadow-md ${
                plan.highlight ? "ring-2 ring-black" : ""
              }`}
            >
              <header className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.badge && <span className="text-sm text-gray-500">{plan.badge}</span>}
              </header>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.frequency}</span>
                </div>

                <p className="mt-4 text-sm text-gray-600">Includes:</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {plan.features?.map((feature, j) => (
                    <li key={j}>✅ {feature}</li>
                  ))}
                </ul>

                {plan.extraInfo && (
                  <p className="mt-6 text-sm text-gray-700">{plan.extraInfo}</p>
                )}

                <button
                  className={`mt-6 w-full py-3 rounded-lg font-medium transition ${
                    plan.highlight
                      ? "bg-black text-white hover:bg-gray-900"
                      : "border border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {/* Billing Example Section */}
        <div className="mt-10 bg-white border border-gray-100 rounded-2xl p-6">
          <h4 className="font-semibold">Billing example</h4>
          <p className="mt-2 text-sm text-gray-600">
            If you send <strong>{includedPasses + exampleOverage}</strong> passes in a month on the Starter plan,
            the first <strong>{includedPasses}</strong> are free and the remaining{" "}
            <strong>{exampleOverage}</strong> are billed at <strong>${overagePerPass.toFixed(2)}</strong> per pass,
            totaling <strong>${total}</strong> extra for that month.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Included passes (Starter)</p>
              <p className="font-medium">{includedPasses.toLocaleString()} / month</p>
            </div>
            <div>
              <p className="text-gray-500">Overage per pass</p>
              <p className="font-medium">${overagePerPass.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Example overage ({exampleOverage} passes)</p>
              <p className="font-medium">${total}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Dynamic dummy pricing for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}
