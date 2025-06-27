

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1010-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/99-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/nuun-1.png" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/44-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/55-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1616-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/77-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1818-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1212-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1313-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1414-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1010-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1616-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1515-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1111-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1919-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1313-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/2121-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1616-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1515-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1111-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1919-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/1313-1.svg" },
  { src: "https://www.yotpo.com/wp-content/uploads/2024/03/2121-1.svg" },
];

const BATCH_SIZE = 8;

export default function FeatureLogoWave() {
  const [batchIndex, setBatchIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatchIndex((prev) => (prev + 1) % Math.ceil(logos.length / BATCH_SIZE));
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const getBatch = (index) => {
    const batch = logos.slice(index * BATCH_SIZE, index * BATCH_SIZE + BATCH_SIZE);
    return batch; 
  };

  const currentBatch = getBatch(batchIndex);

  return (
    <div className="relative max-w-7xl px-8 mx-auto py-12 lg:py-24">
      <div className="flex justify-center items-center gap-10 px-6 py-10 bg-[#FEFCF7] overflow-hidden min-h-[50px] relative h-[64px]">
        <AnimatePresence>
          <motion.div
            key={batchIndex}
            className="absolute inset-0 flex items-center justify-center gap-16 w-full max-w-[700px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentBatch.map((logo, index) => (
              <motion.img
                key={`${batchIndex}-${index}`}
                src={logo.src}
                className="h-6 object-contain"
                initial={{ opacity: 0, y: 20, rotate: -15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                alt="Company logo"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
//    <div className="relative max-w-7xl px-4 sm:px-6 mx-auto py-12 lg:py-24">
//   <div className="flex justify-center items-center px-4 py-10 bg-[#FEFCF7] overflow-hidden min-h-[50px] relative h-auto lg:h-[64px]">
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={batchIndex}
//         className="absolute inset-0 w-full mx-auto flex justify-between items-center flex-wrap lg:flex-nowrap gap-6 sm:gap-10 lg:gap-6 px-4 sm:px-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//       >
//         {currentBatch.map((logo, index) => (
//           <motion.img
//             key={`${batchIndex}-${index}`}
//             src={logo.src}
//             className="h-6 object-contain flex-shrink-0 max-w-[100px]"
//             initial={{ opacity: 0, y: 20, rotate: -15 }}
//             animate={{ opacity: 1, y: 0, rotate: 0 }}
//             transition={{
//               duration: 0.5,
//               delay: index * 0.05,
//               ease: "easeOut"
//             }}
//             alt="Company logo"
//           />
//         ))}
//       </motion.div>
//     </AnimatePresence>
//   </div>
// </div>

  );
}

