// OptionContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const OptionContext = createContext();

// Create a context provider component
export function OptionProvider({ children }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.map(item => item.title).includes(option.title)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.title !== option.title));
    } else {
      if (selectedOptions.length < 6) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const values = {
    selectedOptions,
    toggleOption,
  };

  return <OptionContext.Provider value={values}>{children}</OptionContext.Provider>;
}

// Create a custom hook for using the context
export function useOption() {
  return useContext(OptionContext);
}

// Create a context for managing the colors, selected option, and preview colors
const ColorContext = createContext();

// Create a custom hook to access the context values
export const useColorContext = () => useContext(ColorContext);

// Create a provider component to wrap your app
export const ColorProvider = ({ children }) => {
  const [color_1, setColor_1] = useState('#A4B0C8');
  const [color_2, setColor_2] = useState('#122C5F');
  const [selected, setSelected] = useState(true);
  const [previewcolor_1, setPreviewColor_1] = useState("bg-red");
  const [previewcolor_2, setPreviewColor_2] = useState("bg-blue");

  // Define functions to update the colors, selected option, and preview colors
  const updateColor_1 = (newColor) => {
    setColor_1(newColor);
  };

  const updateColor_2 = (newColor) => {
    setColor_2(newColor);
  };

  const updateSelected = (value) => {
    setSelected(value);
  };

  const updatePreviewColor_1 = (newPreviewColor) => {
    setPreviewColor_1(newPreviewColor);
  };

  const updatePreviewColor_2 = (newPreviewColor) => {
    setPreviewColor_2(newPreviewColor);
  };

  // Create an object with the context values
  const contextValues = {
    color_1,
    color_2,
    selected,
    previewcolor_1,
    previewcolor_2,
    updateColor_1,
    updateColor_2,
    updateSelected,
    updatePreviewColor_1,
    updatePreviewColor_2,
  };

  return (
    <ColorContext.Provider value={contextValues}>
      {children}
    </ColorContext.Provider>
  );
};
