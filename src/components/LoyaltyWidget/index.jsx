import React from 'react';
import Reveal from "react-reveal/Reveal";
import Icons from "../../shared/assets";

const LoyaltyWidget = () => {
    
  return (
    <section className="n_hero_banner_area banner_top">
      <div className="shape_banners">
        <img
          className="img3"
          data-wow-delay="1s"
          src={Icons.BannerImg1.default}
        ></img>
      </div>
      <div className="shape_banners_left">
        <img
          className="header-btm-shape wow fadeIn"
          data-wow-delay="1.5s"
          src={Icons.BannerImg2.default}
        ></img>
      </div>

      <div className="container container-xl">
        <div className="row">
          <div className="col-lg-5">
            <Reveal bottom cascade>
              <div className="n_hero_content">
                <h2 className="wow fadeInLeft" data-wow-delay="0.2s">
                Create your own Loyalty & Referrals program
                </h2>
                <p data-wow-delay="0.3s">
                Make happy customers your competitive advantage with on-brand Loyalty & Referrals programs.
                </p>
                <div className="col-lg-12">
                  <a href="#LoyalyWidget" className="bg_color2 border_btn buttonStyle p-3 px-4">Get Started →</a>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="col-lg-7">
            <div className="hero_img w-100">
              <img
                className="img img-fluid"
                src={Icons.LoyaltyBanner1.default}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoyaltyWidget;