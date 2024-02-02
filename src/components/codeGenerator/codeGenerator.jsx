import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const CouponGenerator = () => {
  const [length, setLength] = useState(8);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [codes, setCodes] = useState([]);
  const [NumberOfCode, setNumberOfCode] = useState(1);
  const [codePattern, setCodePattern] = useState('#####################');
  // eslint-disable-next-line no-unused-vars
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

  const getSelectedLogoSrc = () => {
    const selectedLogoObj = logos.find((logo) => logo.id === selectedLogo);
    return selectedLogoObj ? selectedLogoObj.src : '';
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
  const renderCodeButton = (title, example1, example2, onClickHandler) => (
    <button className="border rounded-lg border-white hover:border-indigo-500" onClick={onClickHandler}>
      <h5 className="text-lg font-bold mb-2">{`Generate ${title} Codes`}</h5>
      <hr/>
      <h6 className="mb-2 pt-2">{example1}</h6>
      <h6 className='mb-2'>{example2}</h6>
    </button>
  );
  return (
    <div className='relative py-12 mx-auto max-w-7xl md:py-24 w-full'>
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className='relative max-w-8xl mx-auto space-y-24'>
        <h1 className='text-white text-center text-2xl font-bold'>Create Your Custom Coupons</h1>
        <div className='flex flex-col items-center justify-center'>
        <h5 className='text-white w-1/2 text-lg font-bold text-center'>Use free code generator to generate unique codes that can be used for coupons, gift cards. If you need an end-to-end promotion management tool, try 99minds.</h5>
        </div>
        <div className="bg-white sm:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className='text-center text-2xl font-bold'>Choose your eCommerce Site</h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 justify-between	px-6 items-center gap-x-2 gap-y-6 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {logos.map((logo) => (
                <label
                  key={logo.id}
                  className={`relative cursor-pointer focus:outline-none border-2 hover:border-indigo-500 rounded-md ${selectedLogo === logo.id ? 'border-indigo-500' : ''}`}
                >
                  <input
                    type="radio"
                    name="logo"
                    className="hidden"
                    onChange={() => setSelectedLogo(logo.id)}
                  />
                  <img
                    src={logo.src}
                    alt={`Logo ${logo.id}`}
                    className="max-h-12 w-full object-contain p-2"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-white text-center py-4">Code Generation Form</h2>

      <div className='mx-auto max-w-7xl px-6 lg:px-8 w-full'>
        <div className="flex space-x-4">
          <div className="mb-4 flex-1">
            <label htmlFor="lengthOfCode" className="block text-sm font-medium text-white">
              Length of Code:
            </label>
            <input
              type="number"
              id="lengthOfCode"
              name="lengthOfCode"
              className="mt-1 p-2 w-full border rounded-md"
              value={length} onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="mb-4 flex-1 justify-center">
            <label htmlFor="numberOfCodes" className="block text-sm font-medium text-white">
              Number of Codes:
            </label>
            <input
              type="number"
              id="numberOfCodes"
              name="numberOfCodes"
              className="mt-1 p-2 w-full border rounded-md"
              value={NumberOfCode} onChange={(e) => setNumberOfCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative" onClick={() => setIsOpen(false)}>
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
      <div className="p-4 text-white text-center w-full">
        <div className="container mx-auto mt-8 justify-center p-4 max-w-7xl px-6 lg:px-8 w-full">
          <button
            className="h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500"
            onClick={toggleDropdown}
          >
            More Actions
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
                  className="mt-1 p-2 w-full border rounded-md text-black"
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
                  className="mt-1 p-2 w-full border rounded-md text-black"
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
                  className="mt-1 p-2 w-full border rounded-md text-black"
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
                    className="form-control text-black w-full rounded-md"
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
                  className="mt-1 p-2 w-full border rounded-md text-black"
                  value={codePattern}
                  onChange={handleCodePatternChange}
                  placeholder="Enter code pattern..."
                />
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4 py-4">Choose Your Templates</h1>
        <div className="mx-auto max-w-7xl text-white">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mx-auto max-w-7xl px-6 lg:px-8 justify-between">
    {renderCodeButton("Alphanumeric", "bTsW1gzi", "DEsfn08t", Alphanumeric)}
    {renderCodeButton("Pattern", "WI?62?D9", "=FWU3SY9", Pattern)}
    {renderCodeButton("Alphabet", "LJqpihKG", "iEkvquRR", Alphabet)}
    {renderCodeButton("All Caps", "TAARRUKY", "FDDRFZWW", allCaps)}
  </div>
</div>
      </div>
      <button className="flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500" onClick={Generate}>
        <h5 className="text-white p-3">Generate</h5>
      </button>
      {generatedCodes && <div className='w-full flex justify-center items-center'>
        <div className='w-1/2 mb-2 boreder-2 rounded-md'>
          <h1 className="text-2xl text-white text-center pb-4 my-4">Generated Codes</h1>
          <ul className="list-group flex flex-col items-center justify-center text-white pt-4 " style={{ height: "33vh", overflow: "auto" }}>
            {codes.map((code, index) => (
              <li className="list-group-item border-2 w-full flex items-center justify-center py-2" key={index}>
                {code.code}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CSVLink data={codes} headers={headers} filename="exported_code.csv">
              <button className="text-white border-2 rounded-md py-2 px-4 hover:border-indigo-500 w-full" type="button">Export</button>
            </CSVLink>
            <button
              className="text-black flex items-center justify-center border-2 bg-white rounded-md py-2 px-4 hover:border-indigo-500 w-full"
              onClick={() => window.open("https://giftcard.99minds.io/access/login", "_blank")}
            >
              Import to
              <img className='pl-2' src={getSelectedLogoSrc()} height={50} width={90} />
            </button>
          </div>

        </div>
      </div>}
    </div>
    </div>
  );
};

export default CouponGenerator;