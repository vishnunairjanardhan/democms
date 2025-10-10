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
    <div className="w-full text-center">
      {/* Section Title */}
      <p>
        <span className="flex items-center justify-center">
            <img src="/5-star.svg" alt="5 stars" className="w-24 h-auto mr-2" />
            5 Star Reviews
        </span>
      </p>

      {/* Buttons Grid */}
      <div className="flex gap-4 justify-center mx-auto max-w-4xl py-3">
        {buttonConfig.map((btn, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(btn.url)}
          >
              <img
                src={btn.logo}
                alt={`${btn.label} logo`}
                className="h-10 w-[140px] px-1 rounded-lg w-auto "
              />
          </button>
        ))}
      </div>
    </div>
  );
}
