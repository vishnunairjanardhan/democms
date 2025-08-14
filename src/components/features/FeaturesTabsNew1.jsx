import React, { useState } from "react";

const FeaturesTabsNew1 = () => {
  const [activeContent, setActiveContent] = useState("default");

  const contentData = {
    default: {
      title: "UGC Library",
      description:
        "Collect all tagged social media posts, engagement data, and download content for landing pages or paid media.",
      posts: [
        {
          user: "Chelsea Mitchell",
          handle: "@chelseartjee",
          bgClass: "from-blue-400 via-purple-400 to-pink-400",
          likes: "56.3k",
          hearts: "1.208",
          views: "7.490",
        },
        // {
        //   user: 'Kristina Sonberg',
        //   handle: '@kristinasoberg',
        //   bgClass: 'from-yellow-400 via-orange-400 to-red-400',
        //   likes: '32.2k',
        //   hearts: '499',
        //   views: '1.879'
        // }
      ],
    },
    automations: {
      title: "Automations Hub",
      description:
        "Streamline your workflow with automated influencer onboarding, contract generation, and payment processing.",
      posts: [
        {
          user: "Sarah Chen",
          handle: "@sarahcodes",
          bgClass: "from-purple-400 via-pink-400 to-red-400",
          likes: "42.1k",
          hearts: "2.1k",
          views: "8.2k",
        },
        // {
        //   user: 'Mike Rodriguez',
        //   handle: '@mikecreates',
        //   bgClass: 'from-green-400 via-blue-400 to-purple-400',
        //   likes: '38.7k',
        //   hearts: '1.8k',
        //   views: '6.9k'
        // }
      ],
    },
    "influencer-management": {
      title: "Influencer Management",
      description:
        "Manage your entire creator network from discovery to long-term partnerships with comprehensive profiles.",
      posts: [
        {
          user: "Emma Wilson",
          handle: "@emmastyle",
          bgClass: "from-pink-400 via-purple-400 to-indigo-400",
          likes: "67.3k",
          hearts: "3.2k",
          views: "12.1k",
        },
        // {
        //   user: 'Alex Johnson',
        //   handle: '@alexfitness',
        //   bgClass: 'from-orange-400 via-red-400 to-pink-400',
        //   likes: '54.8k',
        //   hearts: '2.7k',
        //   views: '9.6k'
        // }
      ],
    },
    "campaign-analytics": {
      title: "Campaign Analytics",
      description:
        "Track ROI, engagement rates, and conversion metrics across all your influencer campaigns with real-time analytics.",
      posts: [
        {
          user: "David Park",
          handle: "@davidtech",
          bgClass: "from-cyan-400 via-blue-400 to-purple-400",
          likes: "29.5k",
          hearts: "1.4k",
          views: "5.8k",
        },
        // {
        //   user: 'Lisa Martinez',
        //   handle: '@lisamakeup',
        //   bgClass: 'from-yellow-400 via-orange-400 to-red-400',
        //   likes: '71.2k',
        //   hearts: '4.1k',
        //   views: '15.3k'
        // }
      ],
    },
    "payout-management": {
      title: "Payout Management",
      description:
        "Automate payments, track commissions, and manage financial relationships with creators seamlessly.",
      posts: [
        {
          user: "Ryan Thompson",
          handle: "@ryantravels",
          bgClass: "from-teal-400 via-green-400 to-blue-400",
          likes: "33.9k",
          hearts: "1.6k",
          views: "7.2k",
        },
        // {
        //   user: 'Jessica Wong',
        //   handle: '@jessicafood',
        //   bgClass: 'from-rose-400 via-pink-400 to-purple-400',
        //   likes: '46.4k',
        //   hearts: '2.3k',
        //   views: '8.7k'
        // }
      ],
    },
    "gifting-seeding": {
      title: "Gifting & Seeding",
      description:
        "Manage product seeding campaigns, track deliveries, and measure the impact of gifted products.",
      posts: [
        {
          user: "Taylor Swift",
          handle: "@taylorbeauty",
          bgClass: "from-indigo-400 via-purple-400 to-pink-400",
          likes: "89.1k",
          hearts: "5.2k",
          views: "18.9k",
        },
        // {
        //   user: 'Chris Evans',
        //   handle: '@chrisfashion',
        //   bgClass: 'from-emerald-400 via-teal-400 to-cyan-400',
        //   likes: '52.7k',
        //   hearts: '2.8k',
        //   views: '11.4k'
        // }
      ],
    },
    "reporting-analytics": {
      title: "Reporting & Analytics",
      description:
        "Generate comprehensive reports with detailed insights on campaign performance and ROI analysis.",
      posts: [
        {
          user: "Amanda Lee",
          handle: "@amandafitness",
          bgClass: "from-violet-400 via-purple-400 to-fuchsia-400",
          likes: "61.8k",
          hearts: "3.4k",
          views: "13.2k",
        },
        // {
        //   user: 'Kevin Zhang',
        //   handle: '@kevintech',
        //   bgClass: 'from-blue-400 via-indigo-400 to-purple-400',
        //   likes: '37.5k',
        //   hearts: '1.9k',
        //   views: '6.8k'
        // }
      ],
    },
    "creator-communications": {
      title: "Creator Communications",
      description:
        "Centralized messaging system with automated workflows, contract management, and collaboration tools.",
      posts: [
        {
          user: "Sophia Garcia",
          handle: "@sophiastyle",
          bgClass: "from-amber-400 via-orange-400 to-red-400",
          likes: "44.3k",
          hearts: "2.1k",
          views: "8.9k",
        },
        // {
        //   user: 'Noah Williams',
        //   handle: '@noahmusic',
        //   bgClass: 'from-lime-400 via-green-400 to-emerald-400',
        //   likes: '58.6k',
        //   hearts: '3.1k',
        //   views: '12.7k'
        // }
      ],
    },
    "cobranded-landing": {
      title: "Cobranded Landing Pages",
      description:
        "Create custom landing pages for each influencer collaboration with personalized branding.",
      posts: [
        {
          user: "Isabella Brown",
          handle: "@bellalifestyle",
          bgClass: "from-fuchsia-400 via-pink-400 to-rose-400",
          likes: "75.9k",
          hearts: "4.3k",
          views: "16.8k",
        },
        // {
        //   user: 'Ethan Davis',
        //   handle: '@ethangaming',
        //   bgClass: 'from-sky-400 via-blue-400 to-indigo-400',
        //   likes: '91.2k',
        //   hearts: '5.7k',
        //   views: '21.3k'
        // }
      ],
    },
  };

  const currentData = contentData[activeContent];

  const handleContentChange = (contentKey) => {
    setActiveContent(contentKey);
  };

  return (
    <div className="bg-white text-black min-h-screen relative max-w-7xl px-0 md:px-12 lg:px-16 mx-auto py-4 lg:py-6">
      <div className="container mx-auto px-6 py-8">
        {/* Top Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-full p-1">
            <button className="px-6 py-3 rounded-full bg-white text-black font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.689 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165C5.6 16.869 4.731 14.646 4.731 11.94c0-3.761 2.733-7.229 7.87-7.229 4.127 0 7.338 2.946 7.338 6.874 0 4.099-2.587 7.4-6.177 7.4-1.204 0-2.34-.624-2.724-1.371 0 0-.596 2.271-.741 2.829-.268 1.031-1.002 2.325-1.492 3.112C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
              Shopify Influencer Hub
            </button>
            <button className="px-6 py-3 rounded-full text-gray-300 font-medium flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Meta Ads Suite
            </button>
            <button className="px-6 py-3 rounded-full text-gray-300 font-medium flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              TikTok Shop
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Hub */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-3xl p-8">
              {/* Shopify Logo */}
              <div className="flex items-center gap-3 mb-8">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.337 2.271c-.15-.02-.321-.02-.503-.02-1.31 0-2.549.47-3.565 1.314-.686-.636-1.593-.988-2.549-.988-1.31 0-2.549.47-3.565 1.314-.015-.007-.029-.015-.044-.022C4.83 3.784 4.5 3.7 4.5 3.7s-.331.084-.611.169c-.015.007-.029.015-.044.022-1.016-.844-2.255-1.314-3.565-1.314-.956 0-1.863.352-2.549.988C-3.285 2.741-4.524 2.271-5.834 2.271c-.182 0-.353 0-.503.02-.683.075-1.289.384-1.805.864-.532.496-.895 1.164-1.02 1.887-.125.723-.012 1.46.32 2.082.332.622.849 1.111 1.459 1.381.61.27 1.289.32 1.915.141.626-.179 1.172-.558 1.541-1.069.369-.511.544-1.124.494-1.731-.05-.607-.314-1.177-.743-1.606-.429-.429-.999-.693-1.606-.743-.607-.05-1.22.125-1.731.494-.511.369-.89.915-1.069 1.541-.179.626-.129 1.305.141 1.915.27.61.759 1.127 1.381 1.459.622.332 1.359.445 2.082.32.723-.125 1.391-.488 1.887-1.02.48-.516.789-1.122.864-1.805z" />
                </svg>
                <span className="text-lg font-medium">shopify</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl font-medium mb-6">
                Shopify Influencer Hub
              </h1>

              {/* Description */}
              <p className="text-black text-lg mb-8 leading-relaxed max-w-2xl">
                Consolidate your influencer, affiliate, and ambassador programs
                into one unified platform. End fragmented workflows, build
                authentic creator relationships, and showcase the full business
                impact.
              </p>

              {/* Learn More Button */}
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-12">
                Learn more
              </button>

              {/* What you get Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">What you get</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                 <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "automations"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("automations")}
                  >
                   Automations
                  </button>


                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "influencer-management"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("influencer-management")}
                  >
                    Influencer Management
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "campaign-analytics"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("campaign-analytics")}
                  >
                    Campaign Analytics
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "payout-management"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("payout-management")}
                  >
                    Payout Management
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "gifting-seeding"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("gifting-seeding")}
                  >
                    Gifting & Seeding
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "reporting-analytics"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("reporting-analytics")}
                  >
                    Reporting & Analytics
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "creator-communications"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() =>
                      handleContentChange("creator-communications")
                    }
                  >
                    Creator Communications
                  </button>

                  <button
                    className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeContent === "cobranded-landing"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleContentChange("cobranded-landing")}
                  >
                    Cobranded Landing Pages
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="space-y-6">
            {/* Dynamic Posts */}
            <div className="space-y-4">
              {currentData.posts.map((post, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 relative overflow-hidden"
                >
                  <div
                    className={`aspect-[3/4] bg-gradient-to-br ${post.bgClass} rounded-xl mb-4 relative`}
                  >
                    <div className="w-full h-full bg-black/20 rounded-xl"></div>
                    <div
                      className={`absolute top-4 ${
                        index === 1 ? "right-4" : "left-4"
                      } flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1`}
                    >
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {post.user}
                        </div>
                        <div className="text-white/80 text-xs">
                          {post.handle}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between text-white/80 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16l-5.83 8.44c-.15.22-.39.36-.65.36s-.5-.14-.65-.36l-3.44-4.98c-.23-.33-.16-.78.17-1.01.33-.23.78-.16 1.01.17l2.79 4.04 5.18-7.49c.22-.32.66-.41.98-.19.32.22.41.66.19.98z"/>
                        </svg>
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>{post.hearts}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Dynamic Library Section */}
            {/* <div className="bg-gray-900 rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-4">{currentData.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {currentData.description}
              </p>
              
             
              <div className="flex justify-center gap-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === 1 ? 'bg-white/80 scale-110' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTabsNew1;
