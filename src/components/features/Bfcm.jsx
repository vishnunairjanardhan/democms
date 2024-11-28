import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import GlobeWithHexCountries from "../../components/customers/ThreeScene.jsx";

const Marquee = () => {
  const images = [
    { src: "/logos/Shopify_log0.svg", width: 160, alt: "Shopify Logo" },
    { src: "/logos/BigC-logo.svg", width: 200, alt: "BigC Logo" },
    { src: "/logos/wooc-logo.svg", width: 200, alt: "WooCommerce Logo" },
    { src: "/logos/Salesforce-logo.svg", width: 200, alt: "Salesforce Logo" },
    { src: "/logos/Heartland-logo.svg", width: 200, alt: "Heartland Logo" },
    { src: "/logos/lightspeed-logo.svg", width: 200, alt: "Lightspeed Logo" },
    { src: "/logos/Square-logo.svg", width: 160, alt: "Square Logo" },
    { src: "/logos/Shopify_log0.svg", width: 160, alt: "Shopify Logo" },
    { src: "/logos/BigC-logo.svg", width: 200, alt: "BigC Logo" },
    { src: "/logos/wooc-logo.svg", width: 200, alt: "WooCommerce Logo" },
    { src: "/logos/Salesforce-logo.svg", width: 200, alt: "Salesforce Logo" },
    { src: "/logos/Heartland-logo.svg", width: 200, alt: "Heartland Logo" },
    { src: "/logos/lightspeed-logo.svg", width: 200, alt: "Lightspeed Logo" },
    { src: "/logos/Square-logo.svg", width: 160, alt: "Square Logo" },
  ];

  return (
    <div className="overflow-hidden shadow-sm p-4 mt-4">
      <div className="marquee-content flex gap-4 items-center animate-marquee">
        {images.map((image, index) => (
          <img
            key={index}
            role="img"
            loading="lazy"
            className="mx-auto justify-center px-4"
            width={image.width}
            alt={image.alt}
            src={image.src}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryStats = () => {
  const categories = [
    { name: "Fashion", percentage: "0.00%" },
    { name: "Sports", percentage: "0.00%" },
    { name: "Shoes", percentage: "0.00%" },
    { name: "Beauty", percentage: "0.00%" },
    { name: "Jewellery", percentage: "0.00%" },
    { name: "Restaurant", percentage: "0.00%" },
    { name: "Cafe", percentage: "0.00%" },
    { name: "Others", percentage: "0.00%" },
  ];

  return (
    <div className="overflow-hidden shadow-sm p-2 mt-8 lg:pt-12 md:pt-8 pt-5">
      <h2 className="text-center">Categories</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-center lg:pt-8 pt-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-12 text-xs px-4 py-2 font-semibold text-white border rounded-2xl bg-vulcan-900 border-vulcan-700"
          >
            <p className="text-white text-base font-normal">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RealTimeStatsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ws;
    const reconnectDelay = 1000;

    const connectWebSocket = () => {
      ws = new WebSocket("https://websocket-server-wcfw.onrender.com");

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        setData(receivedData);
        setLoading(false);
      };

      ws.onclose = () => {
        console.warn("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, reconnectDelay);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close();
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <section className="bg-blac">
      <div className="mx-auto max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-18 items-center lg:py-24 relative w-full bg-[length:700px] bg-auto bg-no-repeat bg-center bg-[url('')]">
        <div className="w-full mt-20 h-full -z-50 absolute left-0 lg:h-full lg:max-w-7xl lg:px-0 mx-auto px-6 lg:py-2">
          <GlobeWithHexCountries />
        </div>
        <div className="">
          <h1 className="mt-4 mx-auto justify-center text-center">
            World's First BFCM Omnichannel Globe,{" "}
            <a className="text-[#AA8FFF]"> Online & Instore</a> Sales
          </h1>
        </div>
        <div className="mt-6">
          <Marquee />
        </div>
        {loading ? (
          <DotLottieReact
            className="h-[200px]"
            src="https://lottie.host/6ed95052-d3f3-46b4-9659-ffc7e08449cd/wwZcBFAmDs.lottie"
            loop
            autoplay
          />
        ) : (
          <>
            <div className="mx-auto grid lg:grid-cols-4 grid-cols-1 lg:gap-5 mt-12">
              <div className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl">
                <div className="px-6 py-3">
                  <p className="text-xl font-semibold text-white text-left">
                    Total Sales
                  </p>
                  <p className="text-3xl mt-1 text-white text-left">
                    ${data.totalSales}
                  </p>
                  <p className="text-xl mt-4 font-normal text-white text-left">
                    Total Number of Orders
                  </p>
                  <p className=" text-3xl mt-1 text-white text-left">
                    {data.totalOrders}
                  </p>
                </div>
              </div>
              <div class="col-start-3"></div>
              <div className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl">
                <div className="px-6 py-3">
                  <p className="text-xl font-semibold text-white text-left">
                    Orders in Real Time
                  </p>
                  <ul className="list-none mt-2" role="list">
                    <li>
                      <div className="text-base items-center flex leading-6 text-vulcan-300 py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 text-indigo-400 icon icon-tabler icon-tabler-circle-check"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                          <path d="M9 12l2 2l4 -4"></path>
                        </svg>
                        <strong className="ml-2 font-semibold text-vulcan-100">
                          North America
                        </strong>
                      </div>
                    </li>
                    <li>
                      <div className="text-base items-center flex leading-6 text-vulcan-300 py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 text-indigo-400 icon icon-tabler icon-tabler-circle-check"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                          <path d="M9 12l2 2l4 -4"></path>
                        </svg>
                        <strong className="ml-2 font-semibold text-vulcan-100">
                          Europe
                        </strong>
                      </div>
                    </li>
                    <li>
                      <div className="text-base items-center flex leading-6 text-vulcan-300 py-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 text-indigo-400 icon icon-tabler icon-tabler-circle-check"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                          <path d="M9 12l2 2l4 -4"></path>
                        </svg>
                        <strong className="ml-2 font-semibold text-vulcan-100">
                          Asia
                        </strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {[
                {
                  label: "Number of Gift Cards Sold",
                  value: data.totalNoOfGiftCardsSold,
                },
                { label: "Gift Cards Sold", value: `$${data.giftCardsSold}` },
                {
                  label: "Gift Cards Redeem",
                  value: `$${data.giftCardsRedeem}`,
                },
                {
                  label: "Total Order Value Lift Using Gift Cards",
                  value: `$${data.totalOrderValueLift}`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl"
                >
                  <div className="px-6 py-4">
                    <p className="mt-0 text-white text-center text-normal">
                      {item.label}
                    </p>
                    <p className="text-3xl mt-3 text-center text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto  grid lg:max-w-6xl lg:grid-cols-3 gap-5 mt-8">
              {[
                { label: "Loyalty Points Earn", value: data.loyaltyPointsEarn },
                {
                  label: "Loyalty Points Redeem",
                  value: data.loyaltyPointsRedeem,
                },
                {
                  label: "Order Placed Using Loyalty Points",
                  value: data.orderPlacedUsingLoyaltyPoints,
                },
                // { label: 'Order Placed Using Cashback', value: data.orderPlacedUsingCashback },
                // { label: 'Order Placed Using Store Credit', value: data.orderPlacedUsingStoreCredit },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl"
                >
                  <div className="px-6 py-4">
                    <p className="mt-0 text-white text-center text-normal">
                      {item.label}
                    </p>
                    <p className="text-3xl mt-3 text-center text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <CategoryStats />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RealTimeStatsSection;
