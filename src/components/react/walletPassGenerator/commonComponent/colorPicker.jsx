export const ColorPicker = ({
  label,
  stateKey,
  updatePassData,
  selectedColor,
  presetColors,
}) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {presetColors.map((color, key) => (
          <button
            key={color}
            onClick={() => updatePassData(stateKey, color)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              selectedColor === color
                ? "border-gray-800 scale-110"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => updatePassData(stateKey, e.target.value)}
        className="w-full h-10 rounded-lg border border-gray-300"
      />
    </div>
  );
};
