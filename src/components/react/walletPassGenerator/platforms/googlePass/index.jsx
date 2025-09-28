import GoogleGiftcard from "./giftcardPass";
import GoogleGiftcardForm from "./giftcardPass/form";
import GoogleLoyalty from "./loyaltyPass";
import GoogleLoyaltyForm from "./loyaltyPass/form";

export const GoogleRenderPassPreview = ({ type, ...props }) => {
  if (type === "giftcard") {
    return <GoogleGiftcard {...{ type, ...props }} />;
  } else return <GoogleLoyalty {...{ type, ...props }} />;
};

export const GoogleRenderPassForm = ({
  type,
  updatePassData,
  fileOnChange,
  ...props
}) => {
  if (type === "giftcard") {
    return (
      <GoogleGiftcardForm {...{ updatePassData, fileOnChange, ...props }} />
    );
  } else
    return (
      <GoogleLoyaltyForm {...{ updatePassData, fileOnChange, ...props }} />
    );
};
