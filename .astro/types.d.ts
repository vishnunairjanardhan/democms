declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"10-best-practices-for-setting-up-your-shopify-gift-card-program.md": {
	id: "10-best-practices-for-setting-up-your-shopify-gift-card-program.md";
  slug: "10-best-practices-for-setting-up-your-shopify-gift-card-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"11-proven-loyalty-program-best-practices-to-retain-and-reward-customers-on-your-shopify-store.md": {
	id: "11-proven-loyalty-program-best-practices-to-retain-and-reward-customers-on-your-shopify-store.md";
  slug: "11-proven-loyalty-program-best-practices-to-retain-and-reward-customers-on-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"21-ways-to-prepare-your-shopify-store-for-the-holidays-in-2024.md": {
	id: "21-ways-to-prepare-your-shopify-store-for-the-holidays-in-2024.md";
  slug: "21-ways-to-prepare-your-shopify-store-for-the-holidays-in-2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5-creative-ways-to-promote-gift-cards-and-increase-customer-engagement.md": {
	id: "5-creative-ways-to-promote-gift-cards-and-increase-customer-engagement.md";
  slug: "5-creative-ways-to-promote-gift-cards-and-increase-customer-engagement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5-key-components-to-personalize-the-loyalty-experience.md": {
	id: "5-key-components-to-personalize-the-loyalty-experience.md";
  slug: "5-key-components-to-personalize-the-loyalty-experience";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5-must-have-features-for-a-successful-shopify-store-gift-card-program.md": {
	id: "5-must-have-features-for-a-successful-shopify-store-gift-card-program.md";
  slug: "5-must-have-features-for-a-successful-shopify-store-gift-card-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5-reasons-why-your-business-should-offer-gift-cards-for-mothers-day.md": {
	id: "5-reasons-why-your-business-should-offer-gift-cards-for-mothers-day.md";
  slug: "5-reasons-why-your-business-should-offer-gift-cards-for-mothers-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"7-reasons-why-every-shopify-store-needs-a-loyalty-program.md": {
	id: "7-reasons-why-every-shopify-store-needs-a-loyalty-program.md";
  slug: "7-reasons-why-every-shopify-store-needs-a-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"8-ways-to-increase-customer-loyalty-with-personalized-rewards.md": {
	id: "8-ways-to-increase-customer-loyalty-with-personalized-rewards.md";
  slug: "8-ways-to-increase-customer-loyalty-with-personalized-rewards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"9-ways-to-increase-gift-card-sales-using-social-media.md": {
	id: "9-ways-to-increase-gift-card-sales-using-social-media.md";
  slug: "9-ways-to-increase-gift-card-sales-using-social-media";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"99mind-integration-with-vend-is-now-live.md": {
	id: "99mind-integration-with-vend-is-now-live.md";
  slug: "99mind-integration-with-vend-is-now-live";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"99minds-schedule-delivery-for-a-gift-card-on-bigcommerce.md": {
	id: "99minds-schedule-delivery-for-a-gift-card-on-bigcommerce.md";
  slug: "99minds-schedule-delivery-for-a-gift-card-on-bigcommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Are Omnichannel Loyalty Programs the Future of Retail.md": {
	id: "Are Omnichannel Loyalty Programs the Future of Retail.md";
  slug: "are-omnichannel-loyalty-programs-the-future-of-retail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Buzz.md": {
	id: "Buzz.md";
  slug: "buzz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Pandemic.md": {
	id: "Pandemic.md";
  slug: "pandemic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-for-everyone.md": {
	id: "ai-for-everyone.md";
  slug: "ai-for-everyone";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-helps-to-make-pizza-more-delicious.md": {
	id: "ai-helps-to-make-pizza-more-delicious.md";
  slug: "ai-helps-to-make-pizza-more-delicious";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-implementation-in-e-commerce.md": {
	id: "ai-implementation-in-e-commerce.md";
  slug: "ai-implementation-in-e-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beginners-guide-to-e-commerce-promotions.md": {
	id: "beginners-guide-to-e-commerce-promotions.md";
  slug: "beginners-guide-to-e-commerce-promotions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"benefits-of-joining-a-bigcommerce-affiliate-programs.md": {
	id: "benefits-of-joining-a-bigcommerce-affiliate-programs.md";
  slug: "benefits-of-joining-a-bigcommerce-affiliate-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"case-study-8-brilliant-loyalty-program-cases-in-2024.md": {
	id: "case-study-8-brilliant-loyalty-program-cases-in-2024.md";
  slug: "case-study-8-brilliant-loyalty-program-cases-in-2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"christmas-marketing-ideas-to-boost-your-sales-this-year.md": {
	id: "christmas-marketing-ideas-to-boost-your-sales-this-year.md";
  slug: "christmas-marketing-ideas-to-boost-your-sales-this-year";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-acquisition-tactics-you-might-be-missing-on.md": {
	id: "customer-acquisition-tactics-you-might-be-missing-on.md";
  slug: "customer-acquisition-tactics-you-might-be-missing-on";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-retention-and-acquisition-using-ai.md": {
	id: "customer-retention-and-acquisition-using-ai.md";
  slug: "customer-retention-and-acquisition-using-ai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-retention/how-to-turn-your-hard-earned-sales-into-repeat-customers.md": {
	id: "customer-retention/how-to-turn-your-hard-earned-sales-into-repeat-customers.md";
  slug: "customer-retention/how-to-turn-your-hard-earned-sales-into-repeat-customers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-referral-marketing-strategies.md": {
	id: "ecommerce-referral-marketing-strategies.md";
  slug: "ecommerce-referral-marketing-strategies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-discounts-to-exclusivity-designing-an-effective-customer-loyalty-program-for-your-shopify-store.md": {
	id: "from-discounts-to-exclusivity-designing-an-effective-customer-loyalty-program-for-your-shopify-store.md";
  slug: "from-discounts-to-exclusivity-designing-an-effective-customer-loyalty-program-for-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"getting-your-e-commerce-shop-thanksgiving-ready.md": {
	id: "getting-your-e-commerce-shop-thanksgiving-ready.md";
  slug: "getting-your-e-commerce-shop-thanksgiving-ready";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-marketing-strategies-to-drive-sales-and-increase-brand-awareness.md": {
	id: "gift-card-marketing-strategies-to-drive-sales-and-increase-brand-awareness.md";
  slug: "gift-card-marketing-strategies-to-drive-sales-and-increase-brand-awareness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-scams-and-what-you-need-to-know-about-them.md": {
	id: "gift-card-scams-and-what-you-need-to-know-about-them.md";
  slug: "gift-card-scams-and-what-you-need-to-know-about-them";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"halloween-tips-for-your-restaurant-use-gift-and-loyalty-as-the-treat.md": {
	id: "halloween-tips-for-your-restaurant-use-gift-and-loyalty-as-the-treat.md";
  slug: "halloween-tips-for-your-restaurant-use-gift-and-loyalty-as-the-treat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"holiday-2020-a-retail-season-like-no-other.md": {
	id: "holiday-2020-a-retail-season-like-no-other.md";
  slug: "holiday-2020-a-retail-season-like-no-other";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to--capitalize-on-the-christmas-rush-using-gift-cards.md": {
	id: "how-to--capitalize-on-the-christmas-rush-using-gift-cards.md";
  slug: "how-to--capitalize-on-the-christmas-rush-using-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-build-customer-loyalty-for-pet-insurance.md": {
	id: "how-to-build-customer-loyalty-for-pet-insurance.md";
  slug: "how-to-build-customer-loyalty-for-pet-insurance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-build-customer-loyalty-for-subscription-as-a-service.md": {
	id: "how-to-build-customer-loyalty-for-subscription-as-a-service.md";
  slug: "how-to-build-customer-loyalty-for-subscription-as-a-service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-build-customer-loyalty-for-the-beauty-industry.md": {
	id: "how-to-build-customer-loyalty-for-the-beauty-industry.md";
  slug: "how-to-build-customer-loyalty-for-the-beauty-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-build-customer-loyalty-for-your-e-commerce-store.md": {
	id: "how-to-build-customer-loyalty-for-your-e-commerce-store.md";
  slug: "how-to-build-customer-loyalty-for-your-e-commerce-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-drive-customer-loyalty-during-a-global-recession.md": {
	id: "how-to-drive-customer-loyalty-during-a-global-recession.md";
  slug: "how-to-drive-customer-loyalty-during-a-global-recession";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-engage-customers-post-holidays-with-gift-card-incentives.md": {
	id: "how-to-engage-customers-post-holidays-with-gift-card-incentives.md";
  slug: "how-to-engage-customers-post-holidays-with-gift-card-incentives";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-get-your-ecommerce-store-ready-for-black-friday-and-cyber-monday.md": {
	id: "how-to-get-your-ecommerce-store-ready-for-black-friday-and-cyber-monday.md";
  slug: "how-to-get-your-ecommerce-store-ready-for-black-friday-and-cyber-monday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-market-your-shopify-gift-card-program-effectively.md": {
	id: "how-to-market-your-shopify-gift-card-program-effectively.md";
  slug: "how-to-market-your-shopify-gift-card-program-effectively";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-set-up-a-loyalty-program-on-shopify-in-2024.md": {
	id: "how-to-set-up-a-loyalty-program-on-shopify-in-2024.md";
  slug: "how-to-set-up-a-loyalty-program-on-shopify-in-2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify.md": {
	id: "increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify.md";
  slug: "increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"innovations-in-e-commerce.md": {
	id: "innovations-in-e-commerce.md";
  slug: "innovations-in-e-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-trends-for-the-decade-to-come.md": {
	id: "loyalty-trends-for-the-decade-to-come.md";
  slug: "loyalty-trends-for-the-decade-to-come";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ml-techniques-to-improve-customer-engagement.md": {
	id: "ml-techniques-to-improve-customer-engagement.md";
  slug: "ml-techniques-to-improve-customer-engagement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moneyball-game-changer-for-everyone.md": {
	id: "moneyball-game-changer-for-everyone.md";
  slug: "moneyball-game-changer-for-everyone";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mothers-day-gift-card-design-ideas-that-will-wow-your-customers.md": {
	id: "mothers-day-gift-card-design-ideas-that-will-wow-your-customers.md";
  slug: "mothers-day-gift-card-design-ideas-that-will-wow-your-customers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"personalized-customer-journey.md": {
	id: "personalized-customer-journey.md";
  slug: "personalized-customer-journey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-art-of-creating-irresistible-gift-card-designs-for-your-shopify-store.md": {
	id: "the-art-of-creating-irresistible-gift-card-designs-for-your-shopify-store.md";
  slug: "the-art-of-creating-irresistible-gift-card-designs-for-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-efficiency-and-effectiveness-of-online-shopping.md": {
	id: "the-efficiency-and-effectiveness-of-online-shopping.md";
  slug: "the-efficiency-and-effectiveness-of-online-shopping";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-green-revolution-digital-gift-cards-vs-plastic-gift-cards.md": {
	id: "the-green-revolution-digital-gift-cards-vs-plastic-gift-cards.md";
  slug: "the-green-revolution-digital-gift-cards-vs-plastic-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rise-of-gift-card-popularity-in-the-ecommerce-era.md": {
	id: "the-rise-of-gift-card-popularity-in-the-ecommerce-era.md";
  slug: "the-rise-of-gift-card-popularity-in-the-ecommerce-era";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-roi-of-a-robust-loyalty-program-for-shopify-merchants.md": {
	id: "the-roi-of-a-robust-loyalty-program-for-shopify-merchants.md";
  slug: "the-roi-of-a-robust-loyalty-program-for-shopify-merchants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tips-to-boost-ecommerce-sales-for-the-thanksgiving-weekend-in-2022.md": {
	id: "tips-to-boost-ecommerce-sales-for-the-thanksgiving-weekend-in-2022.md";
  slug: "tips-to-boost-ecommerce-sales-for-the-thanksgiving-weekend-in-2022";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top-18-best-free-bigcommerce-themes.md": {
	id: "top-18-best-free-bigcommerce-themes.md";
  slug: "top-18-best-free-bigcommerce-themes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top-5-bigcommerce-apps-to-boost-conversions.md": {
	id: "top-5-bigcommerce-apps-to-boost-conversions.md";
  slug: "top-5-bigcommerce-apps-to-boost-conversions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top-ways-to-maximize-gift-card-sales-in-your-shopify-store.md": {
	id: "top-ways-to-maximize-gift-card-sales-in-your-shopify-store.md";
  slug: "top-ways-to-maximize-gift-card-sales-in-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ultimate-guide-to-black-friday-cyber-monday-marketing.md": {
	id: "ultimate-guide-to-black-friday-cyber-monday-marketing.md";
  slug: "ultimate-guide-to-black-friday-cyber-monday-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"unleashing-the-power-of-loyalty-promotion-programs.md": {
	id: "unleashing-the-power-of-loyalty-promotion-programs.md";
  slug: "unleashing-the-power-of-loyalty-promotion-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ways-coupons-can-help-your-business-attract-loyal-customer.md": {
	id: "ways-coupons-can-help-your-business-attract-loyal-customer.md";
  slug: "ways-coupons-can-help-your-business-attract-loyal-customer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ways-to-incentivize-your-bigcommerce-customers-to-return.md": {
	id: "ways-to-incentivize-your-bigcommerce-customers-to-return.md";
  slug: "ways-to-incentivize-your-bigcommerce-customers-to-return";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"we-are-live-with-giftcard-platform-on-bigcommerce.md": {
	id: "we-are-live-with-giftcard-platform-on-bigcommerce.md";
  slug: "we-are-live-with-giftcard-platform-on-bigcommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-are-digital-gift-cards-essential-to-your-e-commerce-business.md": {
	id: "why-are-digital-gift-cards-essential-to-your-e-commerce-business.md";
  slug: "why-are-digital-gift-cards-essential-to-your-e-commerce-business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-gift-cards-are-the-perfect-present-for-busy-moms-on-mothers-day.md": {
	id: "why-gift-cards-are-the-perfect-present-for-busy-moms-on-mothers-day.md";
  slug: "why-gift-cards-are-the-perfect-present-for-busy-moms-on-mothers-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-should-you-use-gift-cards-for-your-business.md": {
	id: "why-should-you-use-gift-cards-for-your-business.md";
  slug: "why-should-you-use-gift-cards-for-your-business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};
"posts-old": {
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"6.md": {
	id: "6.md";
  slug: "6";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
"7.md": {
	id: "7.md";
  slug: "7";
  body: string;
  collection: "posts-old";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
