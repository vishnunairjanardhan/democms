import { presetColors } from "../../../../../../utils/common";
import { FileUpload, ColorPicker } from "../../../commonComponent";

const GiftcardForms = ({ updatePassData, fileOnChange, ...passData }) => {
  return (
    <>
      <div>
        <div className="flex justify-between gap-3  mb-6">
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
              Balance Label
            </label>
            <input
              type="text"
              value={passData.balanceLabel}
              onChange={(e) => updatePassData("balanceLabel", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Label
            </label>
            <input
              type="text"
              value={passData.cardLabel}
              onChange={(e) => updatePassData("cardLabel", e.target.value)}
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
      </div>

      {/* Color Selection */}
      <div className="flex gap-3 mb-6">
        <ColorPicker
          label={"Label Color"}
          stateKey={"labelColor"}
          selectedColor={passData.labelColor}
          {...{ presetColors, updatePassData }}
        />

        <ColorPicker
          label={"Text Color"}
          stateKey={"textColor"}
          selectedColor={passData.textColor}
          {...{ presetColors, updatePassData }}
        />
        <ColorPicker
          label={"Background Color"}
          stateKey={"backgroundColor"}
          selectedColor={passData.backgroundColor}
          {...{ presetColors, updatePassData }}
        />

        {/* Primary Fields */}
        {/* <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">
                    Primary Fields
                  </h3>
                  <button
                    onClick={() => addField("primaryFields")}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    + Add Field
                  </button>
                </div>
                <div className="space-y-3">
                  {passData.primaryFields.map((field, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={field.label}
                        onChange={(e) =>
                          updateField(
                            "primaryFields",
                            index,
                            "label",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) =>
                          updateField(
                            "primaryFields",
                            index,
                            "value",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={() => removeField("primaryFields", index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div> */}
      </div>
    </>
  );
};

export default GiftcardForms;
