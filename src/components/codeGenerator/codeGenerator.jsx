import React, { useState, Fragment } from 'react';
import { CSVLink } from 'react-csv';
import { Menu, Transition } from '@headlessui/react';
import DropdownMenu from './dropdown'

const CouponGenerator = () => {
  const [length, setLength] = useState(8);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [codes, setCodes] = useState([]);
  const [NumberOfCode, setNumberOfCode] = useState(1);
  const [codePattern, setCodePattern] = useState('#####################');
  // eslint-disable-next-line no-unused-vars
  const [verified, setVerified] = useState(false);
  const [characters, setCharacters] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
  const [characterType, setCharacterType] = useState('alphabet');
  const [customCharacters, setCustomCharacters] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  const [generatedCodes, setGeneratedCodes] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const generateGiftCard = () => {
    setLength(16);
    setCodePattern('################');
    setCharacterType('numbers')
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [buttonName, setButtonName] = useState("99Minds");

  const headers = [
    {
      label: 'coupon_code',
      key: 'code',
    }
  ];
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const generateCodes = () => {
    const generatedCodes = [];
    for (let i = 0; i < NumberOfCode; i++) {
      let code = '';
      while (code.length < length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }
      const formattedCode = codePattern
        .split('')
        .map((char, index) => (char === '#' ? code[index] : char))
        .join('');
      generatedCodes.push({
        code: `${prefix}${formattedCode}${suffix}`,
      });
    }
    setGeneratedCodes(true)
    return generatedCodes;
  };

  const Pattern = () => {
    setCharacterType('Pattern');
    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#*|%~?+-_=');
    console.log(characters, 'pattern')

  };

  const Alphanumeric = () => {
    setCharacterType('alphanumeric');
    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    console.log(characters, 'alphanumeric')
  };

  const Alphabet = () => {
    setCharacterType('alphabet');
    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
    console.log(characters, 'alphabet')
  };

  const allCaps = () => {
    setCharacterType('allCaps');
    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    console.log(characters, 'allCaps')
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
    { id: 1, src: '/images/coupon-generator/Shopify_logo_2018.svg' },
    { id: 2, src: '/images/coupon-generator/Bcom_logo.svg' },
    { id: 3, src: '/images/coupon-generator/shopify+.svg' },
    { id: 4, src: '/images/coupon-generator/Salesforce-logo.svg' },
    { id: 5, src: '/images/coupon-generator/woocommerce-logo-1395ccff7884105ee1bc16f777a9964e.png' },
  ];

  return (

    <div class="container-fluid">
      <div>
        <h1 class='text-red'>Create Your Custom Coupons</h1>
        <h5>Use free code generator to generate unique codes that can be used for coupons, gift cards. If you need an end-to-end promotion management tool, try 99minds</h5>
        <div class="bg-white py-24 sm:py-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {logos.map((logo) => (
                <label
                  key={logo.id}
                  class={`relative cursor-pointer focus:outline-none ${selectedLogo === logo.id ? 'border-2 border-blue-500' : ''
                    }`}
                >
                  <input
                    type="radio"
                    name="logo"
                    class="hidden"
                    onChange={() => setSelectedLogo(logo.id)}
                  />
                  <img
                    src={logo.src}
                    alt={`Logo ${logo.id}`}
                    class="max-h-12 w-full object-contain"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DropdownMenu/>
      <h2 class="text-2xl font-semibold mb-4 text-white text-center py-4">Code Generation Form</h2>

      <div class='mx-auto max-w-7xl px-6 lg:px-8' >
        <div class="flex space-x-4 px-4">
          <div class="mb-4 flex-1">
            <label htmlFor="lengthOfCode" class="block text-sm font-medium text-white">
              Length of Code:
            </label>
            <input
              type="number"
              id="lengthOfCode"
              name="lengthOfCode"
              class="mt-1 p-2 w-full border rounded-md"
              value={length} onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div class="mb-4 flex-1 justify-center">
            <label htmlFor="numberOfCodes" class="block text-sm font-medium text-white">
              Number of Codes:
            </label>
            <input
              type="number"
              id="numberOfCodes"
              name="numberOfCodes"
              class="mt-1 p-2 w-full border rounded-md"
              value={NumberOfCode} onChange={(e) => setNumberOfCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative" onClick={() => setIsOpen(false)}>
      <button
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 justify-between px-2 py-2 text-sm font-normal text-white lg:px-3 md:px-3 hover:text-white/50"
      >
        <span>Products</span>
        <svg
          className={`icon icon-tabler icon-tabler-chevron-down inline h-4 transition-transform duration-200 transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6 9l6 6l6 -6"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full origin-top-right rounded-xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" style={{ width: '13rem' }}>
          <div className="py-1 bg-vulcan-900 rounded-xl" role="none">
            <a href="/landings/giftcard" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1" id="menu-item-1">
              Gift Card
            </a>
            <a href="/landings/store-credit" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1">
              Store Credit
            </a>
            <a href="/landings/loyalty" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1">
              Loyalty Program
            </a>
            <a href="/landings/coupons" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1">
              Coupons
            </a>
            <a href="/landings/referral" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1">
              Referrals
            </a>
            <a href="/landings/automated-workflow" className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex="-1">
              Automated Workflows
            </a>
          </div>
        </div>
      )}
    </div>
      <div class="p-4 text-white text-center">
      <div className="container mx-auto mt-8 justify-center p-4 max-w-7xl px-6 lg:px-8">
      <button
        className="bg-blue-400 p-4 text-white font-bold text-lg rounded-lg border-4 border-transparent active:border-white"
        onClick={toggleDropdown}
      >
        Toggle Dropdown
      </button>

      {dropdownOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="mb-4">
            <label htmlFor="prefix" className="block text-sm font-medium text-white">
              Prefix:
            </label>
            <input
              type="text"
              id="prefix"
              name="prefix"
              className="mt-1 p-2 w-full border rounded-md"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="Enter prefix..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="suffix" className="block text-sm font-medium text-white">
              Suffix:
            </label>
            <input
              type="text"
              id="suffix"
              name="suffix"
              className="mt-1 p-2 w-full border rounded-md"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder="Enter suffix..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="suffix" className="block text-sm font-medium text-white">
              Characters:
            </label>
            <select
              id="characterType"
              className="mt-1 p-2 w-full border rounded-md"
              value={characterType}
              onChange={(e) => {
                setCharacterType(e.target.value);
                if (e.target.value === 'custom') {
                  setCharacters(customCharacters);
                } else if (e.target.value === 'alphabet') {
                  setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
                } else if (e.target.value === 'numbers') {
                  setCharacters('0123456789');
                } else if (e.target.value === 'alphanumeric') {
                  setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
                }
              }}
            >
              <option value="custom">Custom</option>
              <option value="alphabet">Alphabet</option>
              <option value="numbers">Numbers</option>
              <option value="alphanumeric">Alphanumeric</option>
            </select>
            {characterType === 'custom' && (
              <input
                type="text"
                id="customCharacters"
                value={customCharacters}
                onChange={(e) => setCustomCharacters(e.target.value)}
                className="form-control"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="codePattern" className="block text-sm font-medium text-white">
              Code Pattern:
            </label>
            <input
              type="text"
              id="codePattern"
              name="codePattern"
              className="mt-1 p-2 w-full border rounded-md"
              value={codePattern}
              onChange={handleCodePatternChange}
              placeholder="Enter code pattern..."
            />
          </div>
        </div>
      )}
    </div>
        <h1 class="text-2xl font-bold mb-4 py-4">Choose Your Templates</h1>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 text-white">
          <div class="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mx-auto max-w-7xl px-6 lg:px-8">
            <button class="p-4 border rounded-lg border-white" onClick={Alphanumeric}>
              <h5 class="text-lg font-bold mb-2">Generate Alphanumeric Codes</h5>
              <h6 class="mb-2">bTsW1gzi</h6>
              <h6>DEsfn08t</h6>
            </button>

            <button class="p-4 border rounded-lg border-white" onClick={Pattern}>
              <h5 class="text-lg font-bold mb-2">Generate Pattern Codes</h5>
              <h6 class="mb-2">WI?62?D9</h6>
              <h6>=FWU3SY9</h6>
            </button>

            <button class="p-4 border rounded-lg border-white" onClick={Alphabet}>
              <h5 class="text-lg font-bold mb-2">Generate Alphabet Codes</h5>
              <h6 class="mb-2">LJqpihKG</h6>
              <h6>iEkvquRR</h6>
            </button>

            <button class="p-4 border rounded-lg border-white" onClick={allCaps}>
              <h5 class="text-lg font-bold mb-2">Generate All Caps Codes</h5>
              <h6 class="mb-2">TAARRUKY</h6>
              <h6>FDDRFZWW</h6>
            </button>
          </div>
        </div>
      </div>
    <div className="p-4">
      <button
        className="bg-blue-400 p-4 flex items-center justify-between font-bold text-lg rounded-lg border-4 border-transparent active:border-white"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Advance Settings
      </button>

      <div className="collapse mt-4" id="collapseExample">
        <div className="card card-body">
          <div className="mb-4">
            <label htmlFor="prefix" className="block text-sm font-medium text-black">
              Prefix:
            </label>
            <input
              type="text"
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="suffix" className="block text-sm font-medium text-black">
              Suffix:
            </label>
            <input
              type="text"
              id="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="characterType" className="block text-sm font-medium text-black">
              Characters:
            </label>
            <div className="input-group">
              <select
                id="characterType"
                className="form-select"
                value={characterType}
                onChange={(e) => {
                  setCharacterType(e.target.value);
                  if (e.target.value === 'custom') {
                    setCharacters(customCharacters);
                  } else if (e.target.value === 'alphabet') {
                    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
                  } else if (e.target.value === 'numbers') {
                    setCharacters('0123456789');
                  } else if (e.target.value === 'alphanumeric') {
                    setCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
                  }
                }}
              >
                <option value="custom">Custom</option>
                <option value="alphabet">Alphabet</option>
                <option value="numbers">Numbers</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
              {characterType === 'custom' && (
                <input
                  type="text"
                  id="customCharacters"
                  value={customCharacters}
                  onChange={(e) => setCustomCharacters(e.target.value)}
                  className="form-control"
                />
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="codePattern" className="block text-sm font-medium text-black">
              Code Pattern:
            </label>
            <input
              type="text"
              id="codePattern"
              value={codePattern}
              onChange={handleCodePatternChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
      <button class="btn btn-bd-primary" style={{ marginTop: "3vh" }} onClick={Generate}>
        <h5 class="text-white">Generate</h5>
      </button>
      <h1 class="text-white">Generated Codes</h1>
      <div>
        <ul class="list-group" style={{ height: "33vh", overflow: "auto" }}>
          {codes.map((code, index) => (
            <li class="list-group-item" key={index}>
              {code.code}</li>
          ))}
        </ul>
        <div style={{ paddingBottom: "30px" }} class='mt-4'>
          <CSVLink data={codes} headers={headers} filename="exported_code.csv">
            <button class="text-white" type="button" >Export</button>
          </CSVLink>
          <button
            class="text-white"
            style={{ marginLeft: "3vh" }}
            onClick={() => window.open("https://giftcard.99minds.io/access/login", "_blank")}
          >Import to {buttonName}</button>
        </div>
      </div>
    </div>
  );
};

export default CouponGenerator;
