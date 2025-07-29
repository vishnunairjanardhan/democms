// import { motion } from "framer-motion";
// import { logos } from "../../config/giftCardConfig";

// const scrollVariants = {
//   animate: (direction) => ({
//     x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
//     transition: {
//       x: {
//         repeat: Infinity,
//         repeatType: "loop",
//         duration: 180,
//         ease: "linear",
//       },
//     },
//   }),
// };

// const MarqueeRow = ({ direction = "left", images }) => {
//   const repeatedLogos = [...images, ...images, ...images, ...images];

//   return (
//     <div className="overflow-hidden w-full">
//       <motion.div
//         className="flex items-center w-max gap-16 h-20"
//         variants={scrollVariants}
//         animate="animate"
//         custom={direction}
//       >
//         {repeatedLogos.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt="logo"
//             className="object-contain"
//           />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default function LogoMarquee() {
//   return (
//     <section className="bg-white relative max-w-7xl mx-auto  lg:pb-12 lg:px-14 py-4 lg:py-16">
//       <MarqueeRow direction="left" images={logos} />
//       <MarqueeRow direction="right" images={logos} />
//       <MarqueeRow direction="left" images={logos} />
//     </section>
//   );
// }

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
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex items-center w-max gap-16 h-20"
        variants={scrollVariants}
        animate="animate"
        custom={direction}
      >
        {repeatedLogos.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="logo"
            className="object-contain h-16"
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
    <section className="bg-white relative max-w-7xl mx-auto lg:pb-12 lg:px-14 py-4 lg:py-16 space-y-10">
      <MarqueeRow direction="left" images={row1Logos} />
      <MarqueeRow direction="right" images={row2Logos} />
      <MarqueeRow direction="left" images={row3Logos} />
    </section>
  );
}

// import { motion } from "framer-motion";
// import { logos } from "../../config/giftCardConfig";

// const MarqueeRow = ({ direction = "left", images }) => {
//   const repeated = [...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images];
  
//   const animation = {
//     animate: {
//       x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
//       transition: {
//         x: {
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: 340,
//           ease: "linear",
//         },
//       },
//     },
//   };

//   return (
//     <div className="overflow-hidden w-full h-16">
//       <motion.div
//         className="flex items-center w-max gap-16 h-16"
//         variants={animation}
//         animate="animate"
//         style={{ willChange: 'transform' }}
//       >
//         {repeated.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt="logo"
//             className="object-contain select-none flex-shrink-0"
//             draggable={false}
//             style={{ display: 'block' }}
//           />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default function LogoMarquee() {
//   return (
//     <section className="bg-white relative max-w-7xl mx-auto py-10 space-y-6 px-4 sm:px-6 lg:px-12">
//       <MarqueeRow direction="left" images={logos} />
//       <MarqueeRow direction="right" images={logos} />
//       <MarqueeRow direction="left" images={logos} />
//     </section>
//   );
// }