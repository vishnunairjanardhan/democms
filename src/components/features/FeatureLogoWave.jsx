

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  { src: "/../assets/logo-cloud/Pinstripe-b.svg" },
  { src: "/../assets/logo-cloud/Bestop-b.svg" },
  { src: "/../assets/logo-cloud/cornerbakery-b.svg" },
  { src: "/../assets/logo-cloud/cariloha-b.svg" },
  { src: "/../assets/logo-cloud/birdsnest-b.svg" },
  { src: "/../assets/logo-cloud/ThirdLove-b.svg" },
  { src: "/../assets/logo-cloud/Flynnohara-b.svg" },
  { src: "/../assets/logo-cloud/coolvines-b.svg" },
  { src: "/../assets/logo-cloud/solsticesunglasses.svg" },
  { src: "/../assets/logo-cloud/solobrands-b.svg" },
  { src: "/../assets/logo-cloud/Pinstripe-b.svg" },
  { src: "/../assets/logo-cloud/Bestop-b.svg" },
  { src: "/../assets/logo-cloud/cornerbakery-b.svg" },
  { src: "/../assets/logo-cloud/cariloha-b.svg" },
  { src: "/../assets/logo-cloud/birdsnest-b.svg" },
  { src: "/../assets/logo-cloud/ThirdLove-b.svg" },
  { src: "/../assets/logo-cloud/Flynnohara-b.svg" },
  { src: "/../assets/logo-cloud/coolvines-b.svg" },
  { src: "/../assets/logo-cloud/solsticesunglasses.svg" },
  { src: "/../assets/logo-cloud/solobrands-b.svg" },
  { src: "/../assets/logo-cloud/Pinstripe-b.svg" },
  { src: "/../assets/logo-cloud/Bestop-b.svg" },
  { src: "/../assets/logo-cloud/cornerbakery-b.svg" },
  { src: "/../assets/logo-cloud/cariloha-b.svg" },
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
    <div className="relative max-w-7xl px-8 mx-auto py-12 lg:py-24 border">
    <p className="text-lg text-center pt-2 py-6">Trusted by teams at</p>
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


  );
}

