import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import compression from 'vite-plugin-compression';
import visualizer from 'rollup-plugin-visualizer';
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

export default defineConfig({
  markdown: {
    drafts: true,
    shikiConfig: { theme: "css-variables" }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: 'https://www.99minds.io',
  integrations: [
    tailwind(),
    react(),
    icon(),
    sitemap({
      serialize(item) {
        if (item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1);
        }
        return item;
      },
    }),
    mdx(),
  //   partytown({
  //   // Adds dataLayer.push as a forwarding-event.
  //   config: {
  //     forward: ["dataLayer.push"],
  //   },
  // })
],
  vite: {
    plugins: [compression(), visualizer()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    // optimizeDeps: {
    //   include: ['@astrojs/partytown'],
    // },
  },
  redirects: {
    '/wallet': '/apple-google-wallet-pass',
    "/blog/gift-card/what-is-the-future-of-e-commerce-in-the-next-5-10-years/": "/blog/what-is-the-future-of-e-commerce-in-the-next-5-10-years/",
    "/blog/gift-card/what-is-an-ecommerce-gift-card-and-how-does-it-work/": "/blog/what-is-an-ecommerce-gift-card-and-how-does-it-work/",
    "/blog/ecommerce/the-efficiency-and-effectiveness-of-online-shopping/": "/blog/the-efficiency-and-effectiveness-of-online-shopping/",
    "/blog/gift-card/gift-cards-marketing-an-absolute-solution-to-win-new-customers-this-valentine/": "/blog/gift-cards-marketing-an-absolute-solution-to-win-new-customers-this-valentine/",
    "/blog/bigcommerce/top-18-best-free-bigcommerce-themes/": "/blog/top-18-best-free-bigcommerce-themes/",
    "/blog/gift-card/useful-gift-card-statistics-to-know-in-2022/": "/blog/useful-gift-card-statistics-to-know-in-2022/",
    "/blog/customer-loyalty/how-do-loyalty-programs-help-the-pet-industry/": "/blog/how-do-loyalty-programs-help-the-pet-industry/",
    "/blog/gift-card/using-your-social-media-accounts-to-sell-more-gift-cards/": "/blog/using-your-social-media-accounts-to-sell-more-gift-cards/",
    "/blog/generic/small-business-ideas-for-valentines-day/": "/blog/small-business-ideas-for-valentines-day/",
    "/blog/gift-card/are-gift-cards-only-for-holidays-and-seasonal-sales/": "/blog/are-gift-cards-only-for-holidays-and-seasonal-sales/",
    "/blog/customer-loyalty/how-to-set-up-a-loyalty-program-on-shopify-in-2024/": "/blog/how-to-set-up-a-loyalty-program-on-shopify-in-2024/",
    "/blog/ecommerce/what-are-promotional-codes-and-how-do-they-work/": "/blog/what-are-promotional-codes-and-how-do-they-work/",
    "/blog/gift-card/how-to-use-gift-card-in-social-media-marketing/": "/blog/how-to-use-gift-card-in-social-media-marketing/",
    "/blog/gift-card/5-employee-gift-ideas-for-thanksgiving/": "/blog/5-employee-gift-ideas-for-thanksgiving/",
    "/blog/generic/easter-promotion-ideas-for-brands-in-2022/": "/blog/easter-promotion-ideas-for-brands-in-2022/",
    "/blog/customer-loyalty/benefits-of-omnichannel-loyalty-programs/": "/blog/benefits-of-omnichannel-loyalty-programs/",
    "/blog/generic/10-best-merchant-services-for-2022/": "/blog/10-best-merchant-services-for-2022/",
    "/blog/customer-engagement/5-key-components-to-personalize-the-loyalty-experience/": "/blog/5-key-components-to-personalize-the-loyalty-experience/",
    "/blog/customer-loyalty/how-to-build-customer-loyalty-for-the-beauty-industry/": "/blog/how-to-build-customer-loyalty-for-the-beauty-industry/",
    "/blog/ecommerce/internationalization-strategies-in-e-commerce/": "/blog/internationalization-strategies-in-e-commerce/",
    "/blog/customer-loyalty/importance-of-omni-channel-loyalty-programs/": "/blog/importance-of-omni-channel-loyalty-programs/",
    "/blog/gift-card/gift-cards-the-perfect-employee-reward-for-your-workforce/": "/blog/gift-cards-the-perfect-employee-reward-for-your-workforce/",
    "/blog/bigcommerce/benefits-of-joining-a-bigcommerce-affiliate-programs/": "/blog/benefits-of-joining-a-bigcommerce-affiliate-programs/",
    "/blog/ecommerce/how-do-i-set-up-an-ecommerce-referral-program/": "/blog/how-do-i-set-up-an-ecommerce-referral-program/",
  }
});
