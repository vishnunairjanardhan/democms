import { useEffect, useState } from "react";
import HeroSectionAmi from "../components/hero-section-ami.tsx";

const STORAGE_KEY = "hero_intro_seen";

const HeroIntroModal = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);

    if (!hasSeen) {
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative min-h-[400px] max-h-screen w-full max-w-[1600px] overflow-hidden bg-white overflow-scroll">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          Skip
        </button>

        {/* Hero Section */}
        <HeroSectionAmi />
      </div>
    </div>
  );
};

export default HeroIntroModal;
