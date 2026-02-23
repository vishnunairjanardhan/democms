export default function LogosCarousel() {
  const logos = [
    { src: "/assets/logos-cloud/Bestop-b.svg", alt: "Bestop", className: "w-[60px] sm:w-[80px] lg:w-[96px]" },
    { src: "/assets/logos-cloud/cariloha-b.svg", alt: "Cariloha", className: "w-[80px] sm:w-[100px] lg:w-[134.77px]" },
    { src: "/assets/logos-cloud/Clubmonaco-b.svg", alt: "Club Monaco", className: "w-[120px] sm:w-[180px] lg:w-[222.78px]" },
    { src: "/assets/logos-cloud/Birdsnest.svg", alt: "Birdsnest", className: "w-[80px] sm:w-[100px] lg:w-[123.93px]" },
    { src: "/assets/logos-cloud/FlynnOhara.svg", alt: "Flynn Ohara", className: "w-[80px] sm:w-[100px] lg:w-[130.91px]" },
    { src: "/assets/logos-cloud/cornerbakery-b.svg", alt: "Corner Bakery", className: "w-[28px] sm:w-[36px] lg:w-[41.33px]" },
    { src: "/assets/logos-cloud/Tootsies.svg", alt: "Tootsies", className: "w-[60px] sm:w-[80px] lg:w-[104.28px]" },
    { src: "/assets/logos-cloud/jaxengray.svg", alt: "Jaxen Gray", className: "w-[36px] sm:w-[48px] lg:w-[56px]" },
    { src: "/assets/logos-cloud/Lovable.svg", alt: "Lovable", className: "w-[80px] sm:w-[100px] lg:w-[136px]" },
    { src: "/assets/logos-cloud/MudAustralia.svg", alt: "Mud Australia", className: "w-[32px] sm:w-[40px] lg:w-[45.28px]" },
    { src: "/assets/logos-cloud/Dunning.svg", alt: "Dunning", className: "w-[120px] sm:w-[160px] lg:w-[194.25px]" },
    { src: "/assets/logos-cloud/LaSenza.svg", alt: "La Senza", className: "w-[60px] sm:w-[80px] lg:w-[100.93px]" },
    { src: "/assets/logos-cloud/Logo_Mizuno.svg", alt: "Mizuno", className: "w-[38px] sm:w-[48px] lg:w-[58px]" },
    { src: "/assets/logos-cloud/Natori.svg", alt: "Natori", className: "w-[100px] sm:w-[130px] lg:w-[157.61px]" },
    { src: "/assets/logos-cloud/DIM Paris.svg", alt: "DIM Paris", className: "w-[40px] sm:w-[50px] lg:w-[60.73px]" },
    { src: "/assets/logos-cloud/Pinstripe-b.svg", alt: "Pinstripes", className: "w-[100px] sm:w-[130px] lg:w-[162px]" },
    { src: "/assets/logos-cloud/GregNorman.svg", alt: "Greg Norman", className: "w-[52px] sm:w-[64px] lg:w-[78.89px]" },
    { src: "/assets/logos-cloud/SoloBrands.svg", alt: "Solo Brands", className: "w-[80px] sm:w-[100px] lg:w-[115.38px]" },
    { src: "/assets/logos-cloud/solsticesunglasses.svg", alt: "Solstice Sunglasses", className: "w-[90px] sm:w-[110px] lg:w-[120.94px]" },
    { src: "/assets/logos-cloud/ThirdLove-b.svg", alt: "ThirdLove", className: "w-[80px] sm:w-[100px] lg:w-[128.55px]" },
  ];

  const renderLogos = (keyPrefix = "") =>
    logos.map((logo, i) => (
      <div key={keyPrefix + i} className="flex-shrink-0 flex items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className={`${logo.className} h-auto object-contain`}
        />
      </div>
    ));

  return (
    <section className="">
      <div className="relative max-w-7xl mx-auto lg:px-14 lg:py-[72px] md:pb-10 pb-6">
        <p className="text-center mb-12">Trusted by teams at</p>

        <div className="relative overflow-hidden bg-white">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

          <div className="flex w-max animate-clientCarouselScroll">
            {/* First set */}
            <div className="lg:mt-0 inline-flex whitespace-nowrap items-center gap-10 sm:gap-10 md:gap-10 lg:gap-[75px]">
              {renderLogos("a")}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-[75px] mt-0 ml-[75px]" aria-hidden="true">
              {renderLogos("b")}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes clientCarouselScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-clientCarouselScroll {
          animation: clientCarouselScroll 120s linear infinite;
        }
      `}</style>
    </section>
  );
}