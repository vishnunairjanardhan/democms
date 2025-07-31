import AppleGiftcard from "./giftcardForm";
import AppleGiftcardForm from "./giftcardForm/form";
import AppleLoyalty from "./loyaltyForm";
import AppleLoyaltyForm from "./loyaltyForm/form";

export const AppleRenderPassPreview = ({ type, ...props }) => {
  if (type === "giftcard") {
    return <AppleGiftcard {...{ type, ...props }} />;
  } else return <AppleLoyalty {...{ type, ...props }} />;
};

export const AppleRenderPassForm = ({
  type,
  updatePassData,
  fileOnChange,
  ...props
}) => {
  if (type === "giftcard") {
    return (
      <AppleGiftcardForm {...{ updatePassData, fileOnChange, ...props }} />
    );
  } else
    return <AppleLoyaltyForm {...{ updatePassData, fileOnChange, ...props }} />;
};
