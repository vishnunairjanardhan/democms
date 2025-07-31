import { presetColors } from "../../../../../../utils/common";
import { FileUpload, ColorPicker } from "../../../commonComponent";

const GiftcardForms = ({ updatePassData, fileOnChange, ...passData }) => {
  return (
    <>
      <div>
        <div className="flex justify-between gap-3 mb-6">
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
              Organization Name
            </label>
            <input
              type="text"
              value={passData.organization}
              onChange={(e) => updatePassData("organization", e.target.value)}
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

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balance Label
            </label>
            <input
              type="text"
              value={passData.balanceLabel}
              onChange={(e) => updatePassData("balanceLabel", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Label
            </label>
            <input
              type="text"
              value={passData.expiryLabel}
              onChange={(e) => updatePassData("expiryLabel", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1">
          <ColorPicker
            label={"Background Color"}
            stateKey={"backgroundColor"}
            selectedColor={passData.backgroundColor}
            {...{ presetColors, updatePassData }}
          />
        </div>
      </div>
    </>
  );
};

export default GiftcardForms;
