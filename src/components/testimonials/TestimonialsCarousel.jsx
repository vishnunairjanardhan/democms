import React, { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import { defaultSlides as defaultSlidesConfig } from "../../config/Testimonial.jsx";

export default function TestimonialsCarousel({
  slides,
  intervalMs = 3000,
  autoPlay = true,
  pauseOnHover = true,
  className,
}) {
  const data = slides && slides.length ? slides : defaultSlidesConfig;
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
      <div className="relative mx-auto max-w-screen md:px-0 lg:px-0 lg:py-0">
        <div className="flex flex-col w-full lg:px-0">
          <section
            className="lg:p-8  transition-all duration-500"
            style={bgStyle}
          >
            <div class="relative max-w-screen md:px-0 lg:px-0 mx-auto py-6">
              <div class="max-w-4xl mx-auto text-center mb-2 px-6">
                <h2 class="font-medium mb-2">Customer Success Stories</h2>
                <p >Don’t just take our word for it. Hear it from our successful customers.
                  <span class="text-[#6820EE] transition-colors duration-300 font-medium"> <a href="/case-study" target="_blanck" class="group inline-flex items-center"> All Customer Stories <svg class="ml-1 h-6 w-6 text-[#6820EE] transition-all duration-300 transform group-hover:translate-x-1" width="10" height="10" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z"></path> <line x1="5" y1="12" x2="19" y2="12"></line> <line x1="13" y1="18" x2="19" y2="12"></line> <line x1="13" y1="6" x2="19" y2="12"></line> </svg> </a></span>
                </p>
              </div>
            </div>
            {/* Tab strip */}
            <div
            className="hidden lg:grid max-w-7xl px-4 lg:px-14 2xl:px-16 relative grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 items-center justify-center w-full h-auto mx-auto mt-10 text-[#303030] select-none"
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
                    "w-full px-3 py-2 md:px-4 md:py-3 rounded-3xl transition-colors flex items-center justify-center",
                    active === i ? "text-white bg-black font-bold" : "text-black"
                )}
                >
                <img
                    src={active === i ? s.logoActiveSrc : s.logoSrc}
                    className="h-6 w-auto md:h-9 md:w-auto lg:h-7 lg:w-auto px-2  object-contain"
                    alt={s.logoAlt}
                />
                </button>
            ))}
            </div>



            {/* Slides */}
            <div className="relative overflow-hidden">
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
                          <li className="p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
                            <div className="lg:py-0 py-4 h-full">
                              <div className="md:flex md:h-full md:items-center justify-between gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto px-8">
                                {/* Left: text */}
                                <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                                  <div className="ml-4 w-28 h-10 md:w-40 md:h-12">
                                    <img
                                      className="w-full h-full object-contain"
                                      alt={s.logoAlt}
                                      src={s.brandLogoSrc}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 w-full mt-10 gap-3 md:gap-4">
                                    {s.metrics.map((m, idx) => (
                                      <div key={idx} className="flex flex-col w-full">
                                        <div className="p-4 rounded-3xl">
                                          <h3 className="font-semibold text-black text-lg md:text-2xl">
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
                                  <div className="mx-4 mt-2">
                                     <p>
                                      <span class="text-[#6820EE] transition-colors duration-300 font-semibold"> <a href= {s.href}  rel="noopener noreferrer" target="_blank" class="group inline-flex items-center">Read Case Study<svg class="ml-1 h-6 w-6 text-[#6820EE] transition-all duration-300 transform group-hover:translate-x-1" width="10" height="10" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z"></path> <line x1="5" y1="12" x2="19" y2="12"></line> <line x1="13" y1="18" x2="19" y2="12"></line> <line x1="13" y1="6" x2="19" y2="12"></line> </svg> </a></span>
                                    </p>
                                  </div>
                                </div>
                                {/* Right: image */}
                                <div className="md:w-[440px] lg:w-[570px] md:mr-8 lg:mr-10 2xl:mr-16 mt-4 md:mt-0">
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
