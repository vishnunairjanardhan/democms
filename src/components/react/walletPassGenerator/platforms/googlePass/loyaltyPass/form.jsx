import { presetColors } from "../../../../../../utils/common";
import { FileUpload, ColorPicker } from "../../../commonComponent";

const LoyaltyForms = ({ updatePassData, fileOnChange, ...passData }) => {
  return (
    <>
      <div>
        <div className="flex justify-between mb-6 gap-3">
          <FileUpload
            label={"Logo"}
            url={passData.logoUrl}
            stateKey={"logoUrl"}
            {...{ updatePassData, fileOnChange }}
          />

          <FileUpload
            label={"Banner Image"}
            url={passData.bannerImage}
            stateKey={"bannerImage"}
            {...{ updatePassData, fileOnChange }}
          />
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Text
            </label>
            <input
              type="text"
              value={passData.logoText}
              onChange={(e) => updatePassData("logoText", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pass Title
            </label>
            <input
              type="text"
              value={passData.passTitle}
              onChange={(e) => updatePassData("passTitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Point Label
            </label>
            <input
              type="text"
              value={passData.pointLabel}
              onChange={(e) => updatePassData("pointLabel", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tier Label
            </label>
            <input
              type="text"
              value={passData.tierLabel}
              onChange={(e) => updatePassData("tierLabel", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div className="flex gap-3 mb-6">
        <ColorPicker
          label={"Background Color"}
          stateKey={"backgroundColor"}
          selectedColor={passData.backgroundColor}
          {...{ presetColors, updatePassData }}
        />
      </div>
    </>
  );
};

export default LoyaltyForms;
