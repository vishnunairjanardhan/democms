import { motion } from "framer-motion";
import { logos } from "../../config/giftCardConfig";

const scrollVariants = {
  animate: (direction) => ({
    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 80,
        ease: "linear",
      },
    },
  }),
};

const MarqueeRow = ({ direction = "left", images }) => {
  const repeatedLogos = [...images, ...images, ...images, ...images];

  return (
    <div className="overflow-hidden w-full relative">
        <div class="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
    <div class="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      <motion.div
        className="flex items-center w-max gap-12 h-36"
        variants={scrollVariants}
        animate="animate"
        custom={direction}
      >
        {repeatedLogos.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="logo"
            className="object-contain border bg-[#F3F4F] p-4 rounded-2xl w-24 h-auto shadow-lg"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default function LogoMarquee() {
  const logosPerRow = Math.ceil(logos.length / 3);
  
  const row1Logos = logos.slice(0, logosPerRow);
  const row2Logos = logos.slice(logosPerRow, logosPerRow * 2);
  const row3Logos = logos.slice(logosPerRow * 2);

  return (
    <section className="bg-white relative max-w-7xl mx-auto  lg:pb-0 lg:px-14 py-4 lg:py-0">
      
      <MarqueeRow direction="left" images={row1Logos} />
      <MarqueeRow direction="right" images={row2Logos} />
      <MarqueeRow direction="left" images={row3Logos} />
    </section>
  );
}

