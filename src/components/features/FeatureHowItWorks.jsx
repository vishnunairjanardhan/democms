export default function FeatureWork({ sectionTitle, subTitle, features = [], cta }) {
  return (
    <section className="relative bg-[#FEFCF5] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-12 lg:px-16 items-center">
        <div>
          <div className="mb-8">
            {sectionTitle && (
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#1c1335]">
                {sectionTitle}
              </h2>
            )}
            {subTitle && (
              <p className="mt-3 text-[#4b4b4b] max-w-md">{subTitle}</p>
            )}
          </div>

          {features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-[#1c1335]">
                    {index + 1}. {feature.title}
                  </h4>
                  <p className="mt-1 text-[#4b4b4b] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {cta?.text && cta?.link && (
            <div className="mt-8">
              <a href={cta.link} className="inline-block px-6 py-3 text-white bg-black rounded-md font-medium transition-colors">
                {cta.text}
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={cta?.img || "/assets/loyalty-demo.webp"}
            alt={cta?.alt || "Membership Program Workflow"}
            className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-md"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
