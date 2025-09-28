import React, { useState, useEffect } from "react";

export default function GetStartedButton() {
  const [open, setOpen] = useState(false);

  // close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Trigger Button */}
      <button
        type="button"
        role="button"
        aria-label="Get Started for Free"
        onClick={() => setOpen(true)}
        className="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium"
      >
        <span className="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
          <span className="relative text-white">Get started for free</span>
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="get-started-title"
          className="fixed inset-0 z-50 w-screen overflow-y-visible"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-vulcan-950 bg-opacity-50"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal Panel */}
          <div className="relative flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-3xl overflow-y-auto shadow-2xl rounded-3xl p-[0.060rem]">
              <div className="bg-white rounded-3xl p-4 text-center">
                <iframe
                  src="../GetStarted"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  title="GetStarted"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
