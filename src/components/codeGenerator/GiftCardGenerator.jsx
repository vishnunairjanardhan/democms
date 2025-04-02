import React, { useState } from "react";
import { CSVLink } from "react-csv";

const CouponGenerator = () => {
  const [length, setLength] = useState(16);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [codes, setCodes] = useState([]);
  const [NumberOfCode, setNumberOfCode] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [codePattern, setCodePattern] = useState("#####################");
  // eslint-disable-next-line no-unused-vars
  const [characters, setCharacters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  );
  const [characterType, setCharacterType] = useState("alphabet");
  const [customCharacters, setCustomCharacters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  );
  const [generatedCodes, setGeneratedCodes] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const generateGiftCard = () => {
    setLength(16);
    setCodePattern("################");
    setCharacterType("numbers");
  };

  const getSelectedLogoSrc = () => {
    const selectedLogoObj = logos.find((logo) => logo.id === selectedLogo);
    return selectedLogoObj ? selectedLogoObj.src : "";
  };
  const getSelectedLogoUrl = () => {
    const selectedLogoObj = logos.find((logo) => logo.id === selectedLogo);
    return selectedLogoObj ? selectedLogoObj.url : "";
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [buttonName, setButtonName] = useState("99Minds");
  const headers = [
    {
      label: "coupon_code",
      key: "code",
    },
  ];
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const generateCodes = () => {
    const generatedCodes = [];
    for (let i = 0; i < NumberOfCode; i++) {
      let code = "";
      while (code.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      const formattedCode = codePattern
        .split("")
        .map((char, index) => (char === "#" ? code[index] : char))
        .join("");
      generatedCodes.push({
        code: `${prefix}${formattedCode}${suffix}`,
      });
    }
    setGeneratedCodes(true);
    return generatedCodes;
  };

  const Numeric = () => {
    setCharacterType("Numeric");
    setCharacters("0123456789");
    console.log(characters, "Numeric");
  };

  const Alphanumeric = () => {
    setCharacterType("alphanumeric");
    setCharacters(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    );
    console.log(characters, "alphanumeric");
  };

  const Alphabet = () => {
    setCharacterType("alphabet");
    setCharacters("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    console.log(characters, "alphabet");
  };

  const allCaps = () => {
    setCharacterType("allCaps");
    setCharacters("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    console.log(characters, "allCaps");
  };

  const handleCodePatternChange = (e) => {
    setCodePattern(e.target.value);
  };

  const Generate = () => {
    const generatedCodes = generateCodes(characters);
    setCodes(generatedCodes);
  };

  const [selectedLogo, setSelectedLogo] = useState(null);

  const logos = [
    {
      id: 1,
      src: "/images/coupon-generator/Shopify_logo_2018.svg",
      url: "https://34bbcb-ae.myshopify.com/",
    },
    {
      id: 2,
      src: "/images/coupon-generator/bc-logo-dark.svg",
      url: "https://99kicks.mybigcommerce.com/",
    },
    {
      id: 3,
      src: "/images/coupon-generator/shopify+.svg",
      url: "https://34bbcb-ae.myshopify.com/",
    },
    {
      id: 4,
      src: "/images/coupon-generator/Salesforce-logo.svg",
      url: "https://giftcard.99minds.io/access/login",
    },
    {
      id: 5,
      src: "/images/coupon-generator/woocommerce-logo-1395ccff7884105ee1bc16f777a9964e.png",
      url: "https://giftcard.99minds.io/access/login",
    },
  ];
  const selectedLogoSrc = {
    1: "/images/coupon-generator/shopify-logo-1-w.svg",
    2: "/images/coupon-generator/bigcommerce-logo-w.svg",
    3: "/images/coupon-generator/shopifyPlus-logo-w.svg",
    4: "/images/coupon-generator/Salesforce-logo-w.svg",
    5: "/images/coupon-generator/woocommerce-logo1-w.svg",
  };
  
  const renderCodeButton = (title, example1, example2, onClickHandler) => (
    <button
      className={`h-60 bg-white
        lg:mb-4 lg:shadow-lg rounded-xl p-[0.060rem] snap-start  
        border ${selectedTemplate === title ? "border-2 border-[#7f56d9]" : "border-black/20"} 
        hover:shadow-2xl transition-all duration-300`}
      onClick={() => {
        onClickHandler();
        setSelectedTemplate(title);
      }}
    >
      <figure className="bg-white rounded-xl pt-8 pb-4">
        <h5 className="px-10 text-lg font-medium tracking-tight text-center text-gray-800 h-16 mb-6">
          {`Generate ${title} Codes`}
        </h5>
        <div className="border-b border-gray-300"></div>
        <h6 className="mt-6 mb-2 pt-2 text-gray-600">{example1}</h6>
        <h6 className="mb-2 text-gray-600">{example2}</h6>
      </figure>
    </button>
  );
  

  return (
    <div className="relative px-8 py-12 mx-auto max-w-7xl md:px-12 lg:px-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen ">
        <div className="relative mx-auto space-y-20 ">
          <div className="flex flex-col items-center justify-center">
            <h1 class="mt-16 tracking-tight text-center text-black">
              Free Gift Card Code Generator
            </h1>
            <p class="mt-6 text-center text-vulcan-700">
              Generate free unique codes for gift cards and kick start your
              successful marketing campaign.
            </p>
          </div>
          <div className="p-[0.060rem] rounded-3xl  shadow-gray-300 bg-white shadow-xl border border-black/20 lg:px-36 py-16 sm:px-4">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-center lg:text-3xl text-2xl font-normal tracking-tight text-black lg:mt-0 mt-12">
                Choose your eCommerce Site
              </h2>
              <div className="mx-auto lg:mt-16 mt-10 grid max-w-lg grid-cols-1 justify-between lg:px-0 px-4 pb-4 items-center gap-x-2 gap-y-6 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                {logos.map((logo) => (
                  <label
                    key={logo.id}
                    className={`relative raise1 cursor-pointer focus:outline-none rounded-lg ${
                      selectedLogo === logo.id
                        ? "bg-gray-700 border-gray-800" 
                        : "bg-white border-gray-700"
                    } 
                      hover:border-black duration-300 group`}
                  >
                    <input
                      type="radio"
                      name="logo"
                      className="hidden"
                      onChange={() => setSelectedLogo(logo.id)}
                    />
                    <img
                      src={selectedLogo === logo.id ? selectedLogoSrc[logo.id] : logo.src}
                      alt={`Logo ${logo.id}`}
                      className="max-h-12 w-full object-contain p-3"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-normal tracking-tight text-black mt-24 mb-4 text-center py-4">
          Code Generation Form
        </h2>

        <div className="mx-auto max-w-7xl px-0 lg:px-16 mt-8 w-full">
          <div className="flex space-x-4">
            <div className="mb-4 flex-1">
              <label
                htmlFor="lengthOfCode"
                className="block text-base font-normal text-black"
              >
                Length of Code:
              </label>
              <input
                type="number"
                id="lengthOfCode"
                name="lengthOfCode"
                className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 bg-transparent border-voilet-700 appearance-none text-gray-800 placeholder-vulcan-400 focus:border-[#7f56d9] focus:bg-transparent  sm:text-sm"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div class="flex-none"></div>
            <div className="mb-4 flex-1 justify-center">
              <label
                htmlFor="numberOfCodes"
                className="block text-base font-normal text-black"
              >
                Number of Codes:
              </label>
              <input
                type="number"
                id="numberOfCodes"
                name="numberOfCodes"
                className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-400 focus:border-[#7f56d9] focus:bg-transparent focus:outline-none sm:text-sm"
                value={NumberOfCode}
                onChange={(e) => setNumberOfCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="relative" onClick={() => setIsOpen(false)}>
          {isOpen && (
            <div
              className="absolute right-0 z-50 mt-2 w-full origin-top-right rounded-xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
              style={{ width: "13rem" }}
            >
              <div className="py-1 bg-vulcan-900 rounded-xl" role="none">
                <a
                  href="/landings/giftcard"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Gift Card
                </a>
                <a
                  href="/landings/store-credit"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Store Credit
                </a>
                <a
                  href="/landings/loyalty"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Loyalty Program
                </a>
                <a
                  href="/landings/coupons"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Coupons
                </a>
                <a
                  href="/landings/referral"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Referrals
                </a>
                <a
                  href="/landings/automated-workflow"
                  className="text-white block px-4 py-2 text-sm hover:text-indigo-400"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Automated Workflows
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="py-4 text-white text-center w-full">
          <div className="container mx-auto mt-8 justify-center p-0 max-w-7xl px-0 lg:px-16 w-full">
            {/* <button
            className="h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500"
            onClick={toggleDropdown}
          >
            More Actions
          </button> */}
            <button
              type="button"
              role="button"
              aria-label="More Actions"
              onClick={toggleDropdown}
              class="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium">
              <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>{" "}
              <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
                <span class="relative text-white">More Actions</span>{" "}
              </span>
            </button>
            {dropdownOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 text-left gap-8 px-0 mt-8">
                <div className="mb-4">
                  <label
                    htmlFor="prefix"
                    className="block text-base font-normal text-black"
                  >
                    Prefix:
                  </label>
                  <input
                    type="text"
                    id="prefix"
                    name="prefix"
                    className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-800 focus:border-[#7f56d9] focus:bg-transparent focus:outline-none  sm:text-sm"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="Enter prefix..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="suffix"
                    className="block text-base font-normal text-black"
                  >
                    Suffix:
                  </label>
                  <input
                    type="text"
                    id="suffix"
                    name="suffix"
                    className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-800 focus:border-[#7f56d9] focus:bg-transparent focus:outline-none  sm:text-sm"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    placeholder="Enter suffix..."
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="suffix"
                    className="block text-base font-normal text-black"
                  >
                    Characters:
                  </label>
                  <select
                    id="characterType"
                    className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-800 focus:border-[#7f56d9] focus:bg-transparent focus:outline-none focus:ring-voilet-600 sm:text-sm"
                    value={characterType}
                    onChange={(e) => {
                      setCharacterType(e.target.value);
                      if (e.target.value === "custom") {
                        setCharacters(customCharacters);
                      } else if (e.target.value === "alphabet") {
                        setCharacters(
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                        );
                      } else if (e.target.value === "numbers") {
                        setCharacters("0123456789");
                      } else if (e.target.value === "alphanumeric") {
                        setCharacters(
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                        );
                      }
                    }}
                  >
                    <option value="custom">Custom</option>
                    <option value="alphabet">Alphabet</option>
                    <option value="numbers">Numbers</option>
                    <option value="alphanumeric">Alphanumeric</option>
                  </select>
                  {characterType === "custom" && (
                    <input
                      type="text"
                      id="customCharacters"
                      value={customCharacters}
                      onChange={(e) => setCustomCharacters(e.target.value)}
                      className="form-control text-black w-full rounded-md"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="codePattern"
                    className="block text-base font-normal text-black"
                  >
                    Code Pattern:
                  </label>
                  <input
                    type="text"
                    id="codePattern"
                    name="codePattern"
                    className="p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-800 focus:border-[#7f56d9] focus:bg-transparent focus:outline-none focus:ring-voilet-600 sm:text-sm"
                    value={codePattern}
                    onChange={handleCodePatternChange}
                    placeholder="Enter code pattern..."
                  />
                </div>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-normal tracking-tight text-black mt-8 text-center py-10">
            Choose Your Templates
          </h2>
          <div className="mx-auto max-w-7xl text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mx-auto max-w-7xl lg:px-16 justify-between">
              {renderCodeButton(
                "Alphanumeric",
                "SUMM ER24 SALE 5489",
                "SALE 2024 GIFT CARD",
                Alphanumeric
              )}
              {renderCodeButton(
                "Numeric",
                "9548 6358 8569 3452",
                "8246 9512 6478 1354",
                Numeric
              )}
              {renderCodeButton(
                "Alphabet",
                "gift card sale offs",
                "vouc hers sale card",
                Alphabet
              )}
              {renderCodeButton(
                "All Caps",
                "TAAR RUKY OFFE RSAL",
                "FDDF SZWW DISC OUNT",
                allCaps
              )}
            </div>
          </div>
        </div>
        {/* <button className="flex items-center justify-center h-10 mt-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500" onClick={Generate}>
        <h5 className="text-white p-3">Generate</h5>
      </button> */}
        <button
          type="button"
          role="button"
          aria-label="More Actions"
          onClick={Generate}
          className="raise1 relative mt-6 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium"
        >
          <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>{" "}
          <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
            <span class="relative text-white">Generate</span>{" "}
          </span>
        </button>
        {generatedCodes && (
          <div className="w-full flex justify-center items-center">
            <div className="w-1/2 mb-2 mt-8 boreder-2 rounded-md">
              <h2 className="text-2xl text-black text-center pb-2 my-4">
                Generated Codes
              </h2>
              <ul
                className="list-group flex flex-col items-center justify-center text-white pt-2 "
                style={{ overflow: "auto" }}
              >
                {codes.map((code, index) => (
                  <li
                    className="list-group-item border-2 w-full flex items-center justify-center p-2 w-full border rounded-md block w-full px-4 py-2 mt-4 border bg-transparent border-vulcan-800 appearance-none text-gray-800 placeholder-vulcan-800 focus:border-indigo-300 focus:bg-transparent focus:outline-none focus:ring-indigo-300 sm:text-sm"
                    key={index}
                  >
                    {code.code}
                  </li>
                ))}
              </ul>
              <div className="justify-center mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CSVLink
                  data={codes}
                  headers={headers}
                  filename="exported_code.csv"
                >
                  <button
                    className="text-black font-medium raise1 rounded-md py-2 lg:px-28 px-16 rounded-lg border border-vulcan-800  hover:border-2 duration-300 group"
                    type="button"
                  >
                    Export
                  </button>
                </CSVLink>
                <button
                  className="text-black font-medium raise1 rounded-md py-2 px-16 rounded-lg border border-vulcan-800 flex justify-between hover:border-2 duration-300 group"
                  onClick={() =>
                    window.open(
                      getSelectedLogoUrl(),
                      "https://giftcard.99minds.io/access/login"
                    )
                  }
                >
                  Import to
                  <img
                    className="pl-2 mt-1 "
                    src={getSelectedLogoSrc()}
                    width={95}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponGenerator;
