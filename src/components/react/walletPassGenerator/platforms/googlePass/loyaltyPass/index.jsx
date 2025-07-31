import GooglePreview from "../giftcardPass";
const GoogleLoyaltyPreview = ({
  logoUrl,
  organization,
  bannerImage,
  backgroundColor,
  pointLabel,
  tierLabel,
  passTitle,
}) => {
  return (
    <GooglePreview
      {...{
        passTitle,
        logoUrl,
        organization,
        bannerImage,
        backgroundColor,
        balanceLabel: pointLabel,
        expiryLabel: tierLabel,
      }}
    />
  );
};

export default GoogleLoyaltyPreview;
