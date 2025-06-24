import React from "react";

function NewLogoCloud() {
  const images = [
    {
      src: "/../assets/logo-cloud/Pinstripe-b.svg",
      width: 160,
      alt: "Pinstripe logo",
    },
    {
      src: "/../assets/logo-cloud/Bestop-b.svg",
      width: 160,
      alt: "Bestop logo",
    },
    {
      src: "/../assets/logo-cloud/cornerbakery-b.svg",
      width: 160,
      alt: "Corner bakery logo",
    },
    {
      src: "/../assets/logo-cloud/cariloha-b.svg",
      width: 160,
      alt: "Cariloha logo",
    },
    {
      src: "/../assets/logo-cloud/birdsnest-b.svg",
      width: 160,
      alt: "Birdsnest logo",
    },
    {
      src: "/../assets/logo-cloud/ThirdLove-b.svg",
      width: 160,
      alt: "Thirdlove Logo",
    },
    {
      src: "/../assets/logo-cloud/Flynnohara-b.svg",
      width: 160,
      alt: "Flynnohara Logo",
    },
    {
      src: "/../assets/logo-cloud/coolvines-b.svg",
      width: 160,
      alt: "Coolvines logo",
    },
    {
      src: "/../assets/logo-cloud/solsticesunglasses.svg",
      width: 160,
      alt: "Solstice logo",
    },
    {
      src: "/../assets/logo-cloud/solobrands-b.svg",
      width: 160,
      alt: "Solobrand logo",
    },
  ];

  const duplicateImages = [...images, ...images, ...images, ...images, ...images, ...images];

  return (
    <section>
      <div className="overflow-hidden shadow-sm p-4 mt-6">
        <p className="text-lg text-center pt-2 py-2">Trusted by teams at</p>
        <div className="flex gap-8 py-6 items-center animate-marquee">
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
    </section>
  );
}

export default NewLogoCloud;
