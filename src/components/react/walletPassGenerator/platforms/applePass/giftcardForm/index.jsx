// import iOSWalletPreview from "../../../assets/iOSWalletPreview.png";
import { QRCodeSVG } from "qrcode.react";
import "../../styles.scss";

const GooglePreview = ({
  logoUrl,
  logoText,
  bannerImage,
  backgroundColor,
  labelColor,
  textColor,

  balanceLabel,
  expiryLabel,
  cardLabel,
}) => {
  return (
    <div className="pass-page-wrapper">
      <div
        className="mobile-case-upper-apple"
        style={{
          backgroundImage: `url(/assets/wallet/iOSWalletPreview.png)`,
        }}
      >
        <div
          className="wallet-pass-container-modal-preview-apple p-0"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center justify-between">
              {!!logoUrl && (
                <img
                  src={logoUrl}
                  style={{
                    maxHeight: "33px",
                    maxWidth: "160px",
                    objectFit: "contain",
                  }}
                  alt="Logo"
                />
              )}

              {!!logoText && (
                <div
                  className="text-truncate pl-1 pr-2"
                  style={{ maxWidth: "80px", color: textColor }}
                >
                  {logoText || ""}
                </div>
              )}
            </div>

            <div className="d-flex flex-column leading-4">
              <div
                className=" text-uppercase font-weight-semi-bold flex justify-end"
                style={{ fontSize: 10, color: labelColor }}
              >
                {balanceLabel}
              </div>
              <div
                className="line-height-1 flex justify-end text-right"
                style={{ color: textColor || "white" }}
              >
                {"$10.00"}
              </div>
            </div>
          </div>

          <div className="min-h-[40px]">
            {bannerImage && (
              <img src={bannerImage} className="stripImage" alt="Strip" />
            )}
          </div>
          <div className="flex justify-between flex-row p-2">
            <div>
              <div
                className="text-uppercase fw-bold"
                style={{
                  fontSize: "11px",
                  color: labelColor || "white",
                }}
              >
                {cardLabel}
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
                {"XXXX-XXXXX-XXXX"}
              </div>
            </div>
            <div>
              <div
                className="text-uppercase fw-bold d-flex justify-content-end"
                style={{ fontSize: "11px", color: labelColor }}
              >
                {expiryLabel}
              </div>
              <div style={{ fontSize: "14px", color: textColor }}>
                {"NEVER"}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2 mb-2">
            <div className="flex justify-center">
              <div className="p-2 rounded-md border bg-white flex justify-center items-center  flex-col text-center">
                <QRCodeSVG size={100} value="https://reactjs.org/" />
                <p className="text-xs mt-1">{"XXXX-XXXXX-XXXX"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GooglePreview;
