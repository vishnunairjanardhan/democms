import buttonConfig from "../../config/buttonConfig";

export default function ButtonsGrid() {
  const handleClick = (url) => {
    if (url.includes("calendly.com") && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {buttonConfig.map((btn, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(btn.url)}
          className="raise1 relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-white border border-black rounded-md absolute"></span>
          <span className="relative px-4 py-2 transition-all ease-out rounded-md group-hover:bg-opacity-10 duration-400 inline-flex items-center gap-2">
            <span className="relative text-black">Get Started with</span>
            {/* Logo */}
            <img
              src={btn.logo}
              alt={`${btn.label} logo`}
              className="w-5 h-5"
            />
          </span>
        </button>
      ))}
    </div>
  );
}
