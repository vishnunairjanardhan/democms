import React, { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";

export default function TestimonialsCarousel({
  slides,
  intervalMs = 3000,
  autoPlay = true,
  pauseOnHover = true,
  className,
}) {
  const data = slides && slides.length ? slides : defaultSlides;
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const rootRef = useRef(null);

  const start = () => {
    if (!autoPlay || timerRef.current) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % data.length);
    }, intervalMs);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    start();
    return () => stop();
  }, [autoPlay, intervalMs, data.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !pauseOnHover) return;
    const onEnter = () => stop();
    const onLeave = () => start();
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
    };
  }, [pauseOnHover]);

  const bgStyle = useMemo(() => ({ background: data[active]?.gradient }), [active, data]);

  const onKeyDownTabs = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % data.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + data.length) % data.length);
    }
  };

  return (
    <section ref={rootRef} className={cn("relative overflow-hidden", className)}>
      <div className="relative mx-auto max-w-screen md:px-8 lg:px-0 lg:py-0">
        <div className="flex flex-col w-full lg:px-0">
          <section
            className="lg:p-8 border-t border-y border-white/5 transition-all duration-500"
            style={bgStyle}
          >
            {/* Tab strip */}
            <div
              className="max-w-7xl px-4 md:px-8 2xl:px-16 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center w-full h-auto mx-auto mt-10 text-[#303030] select-none"
              role="tablist"
              aria-label="Customer Logos"
              onKeyDown={onKeyDownTabs}
            >
              {data.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`slide-panel-${s.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "px-3 py-2 md:px-4 md:py-3 rounded-3xl transition-colors flex items-center justify-center",
                    active === i ? "text-white bg-black font-bold" : "text-black"
                  )}
                >
                  <img
                    src={active === i ? s.logoActiveSrc : s.logoSrc}
                    className="w-20 h-10 object-contain"
                    alt={s.logoAlt}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Slides */}
            <div className="relative overflow-hidden mt-6 md:mt-10">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${active * 100}%)` }}
                aria-live={autoPlay ? "off" : "polite"}
              >
                {data.map((s, i) => (
                  <div
                    key={s.id}
                    className="tab-content flex-shrink-0 w-full h-auto lg:h-[500px]"
                    role="tabpanel"
                    id={`slide-panel-${s.id}`}
                  >
                    <div className="w-full flex flex-col shrink-0 snap-start h-full">
                      <figure className="h-full">
                        <ul className="h-full">
                          <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
                            <div className="lg:py-6 py-4 h-full">
                              <div className="lg:flex lg:h-full lg:items-center justify-between gap-6 md:gap-10 max-w-7xl mx-auto">
                                {/* Left: text */}
                                <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                                  <div className="ml-4 h-12 w-32">
                                    <img
                                      className="w-full h-full object-contain"
                                      alt={s.logoAlt}
                                      src={s.brandLogoSrc}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 w-full mt-10 gap-4">
                                    {s.metrics.map((m, idx) => (
                                      <div key={idx} className="flex flex-col w-full">
                                        <div className="p-4 rounded-3xl">
                                          <h3 className="font-semibold text-black text-lg md:text-2xl lg:text-3xl">
                                            {m.value}
                                          </h3>
                                          <p
                                            className="text-sm md:text-base lg:text-lg text-[#303030]"
                                            dangerouslySetInnerHTML={{ __html: m.label }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {/* Right: image */}
                                <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                                  <img
                                    className="object-cover object-center rounded-3xl w-full h-full"
                                    loading="lazy"
                                    src={s.imageSrc}
                                    alt={s.imageAlt || ""}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

const defaultSlides = [
  {
    id: "mud-australia",
    logoSrc: "/assets/testimonial/MudAustralia-B-logo.svg",
    logoActiveSrc: "/assets/testimonial/MudAustralia-logo.svg",
    logoAlt: "Mud Australia",
    brandLogoSrc: "/assets/testimonial/MudAustralia-B-logo.svg",
    brandLogoClass: "h-12",
    gradient:
      "linear-gradient(180deg, rgb(170,143,255) 0%, rgb(150.5,117.3,255) 100%)",
    imageSrc: "/assets/testimonial/mud-aus-t.webp",
    imageAlt: "Mud Australia store",
    metrics: [
      { value: "38%", label: "Increase Average Spend Over Gift Card Value" },
      { value: "Multi-Currency", label: "AUS $ USD $ GBP £" },
      { value: "30%", label: "Increase in Sales due to rise in Gift card Redemption frequency" },
      { value: "Saved 400hrs", label: "Manual work" },
    ],
  },
  {
    id: "solstice",
    logoSrc: "/assets/testimonial/Solistice-logo.svg",
    logoActiveSrc: "/assets/testimonial/Solistice-logo-w.svg",
    logoAlt: "Solstice",
    brandLogoSrc: "/assets/testimonial/Solistice-logo.svg",
    gradient:
      "linear-gradient(180deg, rgb(184,191,255) 0%, rgb(132.6,144.67,255) 100%)",
    imageSrc: "/assets/testimonial/Solstice-t.webp",
    imageAlt: "Solstice campaign",
    metrics: [
      { value: "$640K", label: "In Sales due to Promotional Gift Cards" },
      { value: "45 Days", label: "Summer Promotion" },
      { value: "28%", label: "Increase in AOV" },
      { value: "Gift Card", label: "As new promotion channel" },
    ],
  },
  {
    id: "natori",
    logoSrc: "/assets/testimonial/Natori-logo.svg",
    logoActiveSrc: "/assets/testimonial/Natori-logo-w.svg",
    logoAlt: "Natori",
    brandLogoSrc: "/assets/testimonial/Natori-logo.svg",
    gradient:
      "linear-gradient(180deg, rgb(147,213,225) 0%, rgb(107.32,197.57,213.98) 100%)",
    imageSrc: "/assets/testimonial/Natori-t.webp",
    imageAlt: "Natori product",
    metrics: [
      { value: "25%", label: "Increase in </br> Customer LTV" },
      { value: "Omnichannel", label: "Online and Instore" },
      { value: "40%", label: "Higher Spending on Redemption" },
      { value: "Gift Cards", label: "As new marketing channel" },
    ],
  },
  {
    id: "bestop",
    logoSrc: "/assets/testimonial/Bestop-logo.svg",
    logoActiveSrc: "/assets/testimonial/Bestop-logo-w.svg",
    logoAlt: "Bestop",
    brandLogoSrc: "/assets/testimonial/Bestop-logo.svg",
    gradient:
      "linear-gradient(180deg, rgb(217,205,255) 0%, rgb(196.86,178.5,255) 100%)",
    imageSrc: "/assets/testimonial/Bestop-T1.webp",
    imageAlt: "Bestop promotion",
    metrics: [
      { value: "$1.5M", label: "In Sales due to Gift Card Promotion" },
      { value: "60 Days", label: "Social Media promotion with Heather Storm" },
      { value: "20%", label: "Increase in AOV" },
      { value: "15%", label: "Increase in Conversion Rate" },
    ],
  },
  {
    id: "calico",
    logoSrc: "/assets/testimonial/calico-logo.svg",
    logoActiveSrc: "/assets/testimonial/calico-logo-w.svg",
    logoAlt: "Calico",
    brandLogoSrc: "/assets/testimonial/calico-logo.svg",
    gradient: "linear-gradient(180deg, #DABDA9 0%, #CBA286 100%)",
    imageSrc: "/assets/testimonial/Calico-t.webp",
    imageAlt: "Calico loyalty",
    metrics: [
      { value: "25%", label: "Increase in </br> Customer LTV" },
      { value: "30%", label: "Increase in ARR" },
      { value: "10%", label: "Increase in AOV" },
      { value: "Omnichannel Loyalty & Referral", label: " New Customer Acquisition & Retention channel" },
    ],
  },
  {
    id: "tassels",
    logoSrc: "/assets/testimonial/Tassels-logo.svg",
    logoActiveSrc: "/assets/testimonial/Tassels-logo-w.svg",
    logoAlt: "Tassels",
    brandLogoSrc: "/assets/testimonial/Tassels-logo.svg",
    gradient:
      "linear-gradient(180deg, rgb(184,191,255) 0%, rgb(132.6,144.67,255) 100%)",
    imageSrc: "/assets/testimonial/tassels-t.webp",
    imageAlt: "Tassels loyalty",
    metrics: [
      { value: "15%", label: "Increase in </br> Customer LTV" },
      { value: "20%", label: "Increase in ARR" },
      { value: "15%", label: "Increase in AOV" },
      { value: "Omnichannel Loyalty & Referral", label: "New Customer Acquisition & Retention channel" },
    ],
  },
];
