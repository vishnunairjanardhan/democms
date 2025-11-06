const pricingConfig = {
  title: "Everything you need to succeed",
  subtitle: "Our platform provides all the tools you need to create, distribute, and manage digital wallet passes.",
  description: "Understand how your mobile wallet passes are performing...",
  pricingPlans: [
    {
      name: "Starter",
      badge: "Best for testing",
      price: "Free",
      frequency: "— forever",
      features: [
        "Up to 1,000 passes per month included",
        "Wallet pass design templates",
        "Basic analytics",
        "Email support",
      ],
      extraInfo: "Extra passes: $0.50 per pass after included limit.",
      buttonText: "Get started — it's free",
    },
    // Add Pro and Enterprise here...
  ],
  billingExample: {
    includedPasses: 1000,
    overagePerPass: 0.5,
    exampleOverage: 500,
  },
};

export default pricingConfig;
