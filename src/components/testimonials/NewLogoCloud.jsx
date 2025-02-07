import React from "react";

function NewLogoCloud() {
  const images = [
    { src: "../assets/logo-cloud/Pinstripe-b.svg", width: 160, alt: "Pinstripe logo" },
    { src: "../assets/logo-cloud/Bestop-b.svg", width: 160, alt: "Bestop logo" },
    { src: "../assets/logo-cloud/cornerbakery-b.svg", width: 160, alt: "Corner bakery logo" },
    { src: "/../assets/logo-cloud/cariloha-b.svg", width: 160, alt: "Cariloha logo" },
    { src: "/../assets/logo-cloud/birdsnest-b.svg", width: 160, alt: "Birdsnest logo" },
    { src: "/../assets/logo-cloud/ThirdLove-b.svg", width: 160, alt: "Thirdlove Logo" },
    { src: "../assets/logo-cloud/Flynnohara-b.svg", width: 160, alt: "Flynnohara Logo" },
    { src: "../assets/logo-cloud/coolvines-b.svg", width: 160, alt: "Coolvines logo" },
    { src: "../assets/logo-cloud/solsticesunglasses-b.svg", width: 160, alt: "Solstice logo" },
    { src: "../assets/logo-cloud/solobrands-b.svg", width: 160, alt: "Solobrand logo" },
  ];

  const duplicateImages = [...images, ...images]; 

  return (
    <div className="overflow-hidden shadow-sm p-4 lg:mt-12">
      <div>
      <p class="text-lg font-body text-black text-center"> Trusted by 1000+ Merchants</p>
      </div>
      <div className="flex gap-10 py-6 items-center animate-marquee">
        {duplicateImages.map((image, index) => (
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
}

export default NewLogoCloud;
