"use client";

import { Button } from "@/components/ui/button";
import { SpinningText } from "@/components/shadcn-studio/blocks/spinning-text";
import { ArrowRight, Sparkles } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function HeroSectionAmi() {
  return (
    <section className="relative bg-[#F8F8F8] overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-[72px] py-8">
        <div className="flex items-start justify-between">
          {/* Left Content */}
          <div className="max-w-[750px]">
            {/* Badge */}
            <div className="relative flex flex-col gap-4 mb-[64px]">
              <div className="rounded-full">
                <span className="border px-2 py-0.5 text-card-foreground inline-flex items-center gap-1  text-sm font-medium rounded-full">
                  <span>⚡</span>
                  Supercharge Your Promotions
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-6xl leading-[1.2] font-bold text-[#111827]">
                Automate Promotions <br /> with Smart{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(90deg, #0283c7 0%, #027ec2 50%, #0278bb 100%)",
                    backgroundClip: "text",
                  }}
                >
                  AI
                </span>{" "}
                <span
                  className="relative bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(90deg, #0161ab 0%, #01368b 50%, #012179 100%)",
                    backgroundClip: "text",
                  }}
                >
                  Agent -
                </span>{" "}
                <span
                  className="relative text-transparent"
                  style={{
                    background:
                      "linear-gradient(90deg, #735FE9 0%, #D855CA 100%, #745FE9 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {"ami."}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[18px] leading-[1.6] text-[#6B7280] max-w-[520px]">
                Build, connect, and automate your promotions effortlessly with
                an intelligent agent designed to think, act, and deliver
                results. Get a glimpse of it at NRF 2026, and sign up for early
                access!
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <Button className="bg-[#6F4DFF] hover:bg-[#6F4DFF]/90 text-white px-6 py-2.5 rounded-md text-sm font-medium cursor-pointer">
                  <div className="flex flex-row items-center w-full px-6">
                    <span>Start Free Trial</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Button>
              </div>

              <span
                className="absolute pointer-events-none"
                style={{
                  width: "108px",
                  height: "281px",
                  right: "230px",
                  top: "50px",
                  transform: "rotate(-90deg)",
                  background:
                    "radial-gradient(50% 50% at 50% 50%, #005F5F 0%, #222055 100%)",
                  filter: "blur(50px)",
                  opacity: 1,
                  pointerEvents: "none",
                  zIndex: 0,
                  mixBlendMode: "color-burn",
                  fill: "radial-gradient(50% 50% at 50% 50%, #005F5F 0%, #222055 100%)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="481"
                  height="308"
                  viewBox="0 0 481 308"
                  fill="none"
                >
                  <g
                    style={{ mixBlendMode: "color-burn" }}
                    filter="url(#filter0_fn_543_14782)"
                  >
                    <ellipse
                      cx="240.5"
                      cy="154"
                      rx="54"
                      ry="140.5"
                      transform="rotate(-90 240.5 154)"
                      fill="url(#paint0_radial_543_14782)"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_fn_543_14782"
                      x="0"
                      y="0"
                      width="481"
                      height="308"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="50"
                        result="effect1_foregroundBlur_543_14782"
                      />
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="10 10"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="1990"
                      />
                      <feColorMatrix
                        in="noise"
                        type="luminanceToAlpha"
                        result="alphaNoise"
                      />
                      <feComponentTransfer
                        in="alphaNoise"
                        result="coloredNoise1"
                      >
                        <feFuncA
                          type="discrete"
                          tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                      </feComponentTransfer>
                      <feComposite
                        operator="in"
                        in2="effect1_foregroundBlur_543_14782"
                        in="coloredNoise1"
                        result="noise1Clipped"
                      />
                      <feFlood
                        flood-color="rgba(255, 255, 255, 0.14)"
                        result="color1Flood"
                      />
                      <feComposite
                        operator="in"
                        in2="noise1Clipped"
                        in="color1Flood"
                        result="color1"
                      />
                      <feMerge result="effect2_noise_543_14782">
                        <feMergeNode in="effect1_foregroundBlur_543_14782" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <radialGradient
                      id="paint0_radial_543_14782"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(240.5 154) rotate(90) scale(140.5 54)"
                    >
                      <stop stop-color="#005F5F" />
                      <stop offset="1" stop-color="#222055" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
            </div>

            {/* Generating Offers Card */}
            <div className={"flex flex-col"}>
              <div className="mb-8">
                <div
                  className="inline-flex items-center  w-[260px] gap-2 bg-white rounded-full px-5 py-3 shadow-2xl "
                  style={{
                    borderRadius: 50,
                    background: "#FFF",
                    boxShadow:
                      "0 6px 13px 0 rgba(0, 0, 0, 0.24), 0 23px 23px 0 rgba(0, 0, 0, 0.05), 0 52px 31px 0 rgba(0, 0, 0, 0.12), 0 92px 37px 0 rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.06329 0.666013C7.37795 -0.222005 8.63379 -0.222004 8.94845 0.666014L10.463 4.94021C10.5637 5.22446 10.7873 5.44808 11.0716 5.5488L15.3458 7.06329C16.2338 7.37795 16.2338 8.63379 15.3458 8.94845L11.0716 10.463C10.7873 10.5637 10.5637 10.7873 10.463 11.0716L8.94845 15.3458C8.63379 16.2338 7.37795 16.2338 7.06329 15.3458L5.5488 11.0716C5.44808 10.7873 5.22446 10.5637 4.94021 10.463L0.666013 8.94845C-0.222005 8.63379 -0.222004 7.37795 0.666014 7.06329L4.94021 5.5488C5.22446 5.44808 5.44808 5.22446 5.5488 4.94021L7.06329 0.666013Z"
                      fill="#6F4DFF"
                    />
                  </svg>
                  <span
                    className="text-[#09002E] text-base font-medium truncate max-w-[185px] inline-block"
                    title="Generating Promotions..."
                  >
                    Generating Promotions...
                  </span>
                </div>
              </div>

              {/* Promotional Cards */}
              <div className="inline-flex flex-col space-y-3 z-10">
                {/* Time Specific Card */}
                <div className="inline-flex flex-col gap-2.5 flex-wrap bg-[#F8F8F8] border border-[#474857]/50 rounded-xl px-3 py-2.5 max-w-[345px]">
                  <span className="border bg-pink-600 text-white px-2 py-0.5 inline-flex items-center gap-1 text-sm font-medium rounded-full self-start">
                    Celebration Sale
                  </span>
                  <div className="flex gap-2 items-center gap-3">
                    <img
                      src="/ProductCard1.png"
                      alt="Coffee Cup"
                      className="w-[41px] h-10 object-contain"
                    />

                    <div>
                      <p className="text-[#111827] text-sm font-semibold">
                        LOVE YOUR SHAPE,{" "}
                        <span className="text-pink-600">GET LUXE</span>
                      </p>
                      <p className="text-secondary-foreground text-sm">
                        Free matching set with loungewear
                      </p>
                    </div>
                  </div>
                </div>

                {/* Combo Offer Card */}
                <div className="inline-flex flex-col gap-2.5 flex-wrap bg-[#F8F8F8] border border-[#474857]/50 rounded-xl px-3 py-2.5 max-w-[345px]">
                  <span className="border bg-pink-600 text-white px-2 py-0.5 inline-flex items-center gap-1 text-sm font-medium rounded-full self-start">
                    Combo Offer
                  </span>
                  <div className="flex gap-2 items-center gap-3">
                    <img
                      src="/ProductCard2.png"
                      alt="Woment Wednesday"
                      className="w-[41px] h-10 object-contain"
                    />

                    <div>
                      <p className="text-[#111827] text-sm font-semibold">
                        DEALS-,{" "}
                        <span className="text-pink-600">WOMEN’S WEDNESDAY</span>
                      </p>
                      <p className="text-secondary-foreground text-sm">
                        Buy 2 Get 1 on all Blemish Control
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fitness Exclusive Card */}
                <div className="inline-flex flex-col gap-2.5 flex-wrap bg-[#F8F8F8] border border-[#474857]/50 rounded-xl px-3 py-2.5 max-w-[345px]">
                  <span className="border bg-yellow-300 text-neutral-950 px-2 py-0.5 inline-flex items-center gap-1 text-sm font-medium rounded-full self-start">
                    Fitness Exclusive
                  </span>
                  <div className="flex gap-2 items-center gap-3">
                    <img
                      src="/ProductCard3.png"
                      alt="Shoes"
                      className="w-[41px] h-10 object-contain"
                    />

                    <div>
                      <p className="text-[#111827] text-sm font-semibold">
                        SPORTSWEAR <span className="text-teal-800">SALE</span>
                      </p>
                      <p className="text-secondary-foreground text-sm">
                        Upto 30% Off
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smarter Promotion Section */}
              <div className="flex flex-col gap-2 mt-4 py-2">
                <h3 className="text-primary text-xl font-semibold">
                  Smarter promotion suggestions
                </h3>
                <p className="text-muted-foreground text-sm leading-[1.5] max-w-[320px]">
                  AI-powered and data-driven promotion recommendations for what
                  to upsell. No more guesswork.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Spline 3D Robot */}
          {/* <div className="pointer-events-none absolute bottom-12 right-12 z-30">
            <div className="relative w-[140px] h-[140px]">
              <SpinningText
                className="w-full h-full border border-red rounded-full text-sm font-medium text-[#111827] tracking-[0.15em]"
                duration={15}
                radius={6.5}
                showInnerCircle
              >
                {"✦ Intelligent ✦ Commerce ✦ Company"}
              </SpinningText>
            </div>
          </div> */}
        </div>
      </div>
      <div className="absolute bottom-[0%] left-3/4 xl:left-2/3 aspect-2/1 w-full max-w-[1600px] h-full -translate-x-1/2 max-md:hidden">
        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>
      <div className="pointer-events-none absolute bottom-12 right-12 z-30">
        <div className="relative w-[140px] h-[140px]">
          <SpinningText
            className="w-full h-full border border-red rounded-full text-sm font-medium text-[#111827] tracking-[0.15em]"
            duration={15}
            radius={6.5}
            showInnerCircle
          >
            {"✦ Intelligent ✦ Commerce ✦ Company"}
          </SpinningText>
        </div>
      </div>
    </section>
  );
}
