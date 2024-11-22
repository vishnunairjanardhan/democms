import { useEffect, useState } from 'react';
import GlobeWithHexCountries from "../../components/customers/ThreeScene.jsx";

const RealTimeStatsSection = () => {
  const [data, setData] = useState({
    totalSales: 0,
    giftCardSold: 0,
    giftCardRedeem: 0,
    giftCardLift: 0,
    totalOrderLift: 0,
    loyaltySignup: 0,
    loyaltyPointEarn: 0,
    loyaltyPointRedeem: 0,
    orderPlacedUsingLoyaltyPoint: 0,
  });

  useEffect(() => {
    const ws = new WebSocket('https://websocket-server-wcfw.onrender.com'); // Replace with your WebSocket server URL

    ws.onmessage = (message) => {
      const updatedData = JSON.parse(message.data);
      setData(updatedData);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <section className="bg-blac">
      <div className="mx-auto max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-18 items-center lg:py-24 relative w-full bg-[length:700px] bg-auto bg-no-repeat bg-center bg-[url('/assets/shopifycheckout/eart.gif')]">
        <div className="w-full mt-10 h-full -z-50 absolute left-0 lg:h-full lg:max-w-7xl lg:px-0 mx-auto px-6 lg:py-2">
          <GlobeWithHexCountries/>
        </div>
        <div className="mx-auto">
          <img
            role="img"
            loading="lazy"
            className=""
            width="200"
            alt="5 Star Rating"
            src="/assets/shopifycheckout/ecom-logo.png"
          />
        </div>

        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          <div className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl">
            <div className="px-6 py-3">
              <p className="text-xl font-semibold text-white text-left">Total Sales</p>
              <p className="text-3xl mt-3 text-white text-left">${data.totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl">
            <div className="px-6 py-3">
              <p className="text-xl font-semibold text-white text-left">Orders in Real Time</p>
              <ul className="list-none mt-2" role="list">
                <li>
                  <p className="text-base leading-6 text-vulcan-300">
                    <strong className="font-semibold text-vulcan-100">North America</strong>
                  </p>
                </li>
                <li>
                  <p className="text-base leading-6 text-vulcan-300">
                    <strong className="font-semibold text-vulcan-100">Europe</strong>
                  </p>
                </li>
                <li>
                  <p className="text-base leading-6 text-vulcan-300">
                    <strong className="font-semibold text-vulcan-100">Asia</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {[
            { label: 'Gift Card Sold', value: data.giftCardSold },
            { label: 'Gift Card Redeem', value: data.giftCardRedeem },
            { label: 'Total Order Lift', value: data.totalOrderLift },
            { label: 'Loyalty Signup', value: data.loyaltySignup },
            { label: 'Loyalty Point Earn', value: data.loyaltyPointEarn },
            { label: 'Loyalty Point Redeem', value: data.loyaltyPointRedeem },
            { label: 'Order Placed Using Loyalty Point', value: data.orderPlacedUsingLoyaltyPoint },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-[0.060rem] shadow-2xl shadow-vulcan-950 bg-gradient-to-b from-slate-800 via-indigo-500/5 rounded-3xl"
            >
              <div className="px-6 py-4">
                <p className="mt-0 text-white text-normal">{item.label}</p>
                <p className="text-3xl mt-3 text-white">{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealTimeStatsSection;
