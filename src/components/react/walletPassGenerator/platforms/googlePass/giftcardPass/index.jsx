// import AndroidWalletPreview from "../../../assets/AndroidWalletPreview.png";
import { QRCodeSVG } from "qrcode.react";
import "../../styles.scss";
import { getAutoFontColor } from "../../../../../../utils/common";

const GooglePreview = ({
  logoUrl,
  passTitle,
  organization,
  bannerImage,
  backgroundColor,
  balanceLabel,
  balanceValue,
  expiryLabel,
  expiryValue,
}) => {
  const textColor = getAutoFontColor(backgroundColor);
  return (
    <div className="pass-page-wrapper">
      <div
        className="mobile-case-upper-apple"
        style={{
          backgroundImage: `url(/assets/wallet/AndroidWalletPreview.png)`,
        }}
      >
        <div
          className="wallet-pass-container-modal-preview-apple p-0"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center justify-between rounded-full">
              {!!logoUrl && (
                <img
                  className="border border-[${textColor}] h-[35px] w-[35px] object-cover bg-white rounded-full p-1"
                  src={logoUrl}
                  alt="Logo"
                />
              )}

              {!!organization && (
                <div
                  className="text-truncate font-medium ml-1 pr-2 text-sm"
                  style={{ maxWidth: "100px", color: textColor }}
                >
                  {organization || ""}
                </div>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300 my-1" />

          <div className="p-2">
            <div
              className="text-uppercase fw-bold"
              style={{
                fontSize: "12px",
                color: textColor || "white",
              }}
            >
              {"John Doe"}
            </div>
            <div
              style={{
                fontSize: "16px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: textColor || "white",
              }}
            >
              {passTitle}
            </div>
          </div>

          <div className="flex justify-between flex-row p-2">
            <div>
              <div
                className="text-uppercase fw-bold"
                style={{
                  fontSize: "11px",
                  color: textColor || "white",
                }}
              >
                {balanceLabel}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: textColor || "white",
                }}
              >
                {balanceValue || "$10.00"}
              </div>
            </div>
            <div>
              <div
                className="text-xs text-uppercase fw-bold flex justify-end"
                style={{ color: textColor }}
              >
                {expiryLabel}
              </div>
              <div
                className="text-sm text-uppercase fw-bold flex justify-end"
                style={{ color: textColor }}
              >
                {expiryValue || "NEVER"}
              </div>
            </div>
          </div>

          <div className="mt-2 mb-2">
            <div className="flex flex-col justify-center">
              <div
                className={`flex justify-center items-center  flex-col text-center`}
              >
                <QRCodeSVG
                  className={`p-2 rounded-md border border-[${textColor}] bg-white`}
                  size={80}
                  value="https://reactjs.org/"
                />
                <p style={{ color: textColor }} className="text-xs mt-1">
                  {"XXXX-XXXXX-XXXX"}
                </p>
              </div>
            </div>
          </div>

          <div>
            {bannerImage && (
              <img src={bannerImage} className="stripImage" alt="Strip" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePreview;
