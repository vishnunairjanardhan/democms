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

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

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
				import('astro/zod').ZodLiteral<'avif'>,
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
"10-awesome-tips-for-using-gift-cards-to-boost-your-holiday-sales.md": {
	id: "10-awesome-tips-for-using-gift-cards-to-boost-your-holiday-sales.md";
  slug: "10-awesome-tips-for-using-gift-cards-to-boost-your-holiday-sales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"10-best-merchant-services-for-2022.md": {
	id: "10-best-merchant-services-for-2022.md";
  slug: "10-best-merchant-services-for-2022";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"10-best-point-of-sale-pos-systems-for-2022.md": {
	id: "10-best-point-of-sale-pos-systems-for-2022.md";
  slug: "10-best-point-of-sale-pos-systems-for-2022";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"10-mothers-day-ideas-to-implement-in-your-retail-business.md": {
	id: "10-mothers-day-ideas-to-implement-in-your-retail-business.md";
  slug: "10-mothers-day-ideas-to-implement-in-your-retail-business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"11-best-practices-for-profitable-promotions.md": {
	id: "11-best-practices-for-profitable-promotions.md";
  slug: "11-best-practices-for-profitable-promotions";
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
"5-employee-gift-ideas-for-thanksgiving.md": {
	id: "5-employee-gift-ideas-for-thanksgiving.md";
  slug: "5-employee-gift-ideas-for-thanksgiving";
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
"5-tips-for-promoting-fathers-day-in-your-online-shop.md": {
	id: "5-tips-for-promoting-fathers-day-in-your-online-shop.md";
  slug: "5-tips-for-promoting-fathers-day-in-your-online-shop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"6-mothers-day-marketing-ideas-for-ecommerce-businesses.md": {
	id: "6-mothers-day-marketing-ideas-for-ecommerce-businesses.md";
  slug: "6-mothers-day-marketing-ideas-for-ecommerce-businesses";
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
"7-valentines-day-marketing-ideas.md": {
	id: "7-valentines-day-marketing-ideas.md";
  slug: "7-valentines-day-marketing-ideas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"8-ways-to-boost-sales-with-gift-cards-this-mothers-day.md": {
	id: "8-ways-to-boost-sales-with-gift-cards-this-mothers-day.md";
  slug: "8-ways-to-boost-sales-with-gift-cards-this-mothers-day";
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
"Black-friday-promotion-ideas.md": {
	id: "Black-friday-promotion-ideas.md";
  slug: "black-friday-promotion-ideas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Christmas-marketing-ideas.md": {
	id: "Christmas-marketing-ideas.md";
  slug: "christmas-marketing-ideas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Ways to Incorporate Gift Cards Into Your Customer Retention Strategy.md": {
	id: "Ways to Incorporate Gift Cards Into Your Customer Retention Strategy.md";
  slug: "ways-to-incorporate-gift-cards-into-your-customer-retention-strategy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-comprehensive-guide-to-Digital-Gift-Cards.md": {
	id: "a-comprehensive-guide-to-Digital-Gift-Cards.md";
  slug: "a-comprehensive-guide-to-digital-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-for-customer-engagement.md": {
	id: "ai-for-customer-engagement.md";
  slug: "ai-for-customer-engagement";
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
"ai-in-ecommerce.md": {
	id: "ai-in-ecommerce.md";
  slug: "ai-in-ecommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"are-gift-cards-only-for-holidays-and-seasonal-sales.md": {
	id: "are-gift-cards-only-for-holidays-and-seasonal-sales.md";
  slug: "are-gift-cards-only-for-holidays-and-seasonal-sales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"b2b-ecommerce-trends.md": {
	id: "b2b-ecommerce-trends.md";
  slug: "b2b-ecommerce-trends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"b2b-loyalty-program.md": {
	id: "b2b-loyalty-program.md";
  slug: "b2b-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bank-loyalty-programs.md": {
	id: "bank-loyalty-programs.md";
  slug: "bank-loyalty-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beauty-loyalty-program.md": {
	id: "beauty-loyalty-program.md";
  slug: "beauty-loyalty-program";
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
"benefits-of-a-loyalty-program.md": {
	id: "benefits-of-a-loyalty-program.md";
  slug: "benefits-of-a-loyalty-program";
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
"best-mothers-day-gift-cards-2021.md": {
	id: "best-mothers-day-gift-cards-2021.md";
  slug: "best-mothers-day-gift-cards-2021";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bfcm-sale.md": {
	id: "bfcm-sale.md";
  slug: "bfcm-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"black-friday-cyber-monday-record-success .md": {
	id: "black-friday-cyber-monday-record-success .md";
  slug: "black-friday-cyber-monday-record-success-";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"brand-loyalty.md": {
	id: "brand-loyalty.md";
  slug: "brand-loyalty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"build-customer-loyalty.md": {
	id: "build-customer-loyalty.md";
  slug: "build-customer-loyalty";
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
"celebrating-women-and-their-achievements.md": {
	id: "celebrating-women-and-their-achievements.md";
  slug: "celebrating-women-and-their-achievements";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"consumer-decision-making-process.md": {
	id: "consumer-decision-making-process.md";
  slug: "consumer-decision-making-process";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"coupon-marketing.md": {
	id: "coupon-marketing.md";
  slug: "coupon-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"coupon-scams.md": {
	id: "coupon-scams.md";
  slug: "coupon-scams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-acquisition-strategy.md": {
	id: "customer-acquisition-strategy.md";
  slug: "customer-acquisition-strategy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-acquisition.md": {
	id: "customer-acquisition.md";
  slug: "customer-acquisition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-engagement.md": {
	id: "customer-engagement.md";
  slug: "customer-engagement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-lifetime-value.md": {
	id: "customer-lifetime-value.md";
  slug: "customer-lifetime-value";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-loyalty-analytics.md": {
	id: "customer-loyalty-analytics.md";
  slug: "customer-loyalty-analytics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-loyalty-trends.md": {
	id: "customer-loyalty-trends.md";
  slug: "customer-loyalty-trends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"customer-loyalty.md": {
	id: "customer-loyalty.md";
  slug: "customer-loyalty";
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
"customer-retention.md": {
	id: "customer-retention.md";
  slug: "customer-retention";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-vs.-physical-gift-card.md": {
	id: "digital-vs.-physical-gift-card.md";
  slug: "digital-vs-physical-gift-card";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dtc-marketing.md": {
	id: "dtc-marketing.md";
  slug: "dtc-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"easter-promotion-ideas-for-brands-in-2022.md": {
	id: "easter-promotion-ideas-for-brands-in-2022.md";
  slug: "easter-promotion-ideas-for-brands-in-2022";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-gift-cards-catalysts-to-increase-holiday-season-sales.md": {
	id: "ecommerce-gift-cards-catalysts-to-increase-holiday-season-sales.md";
  slug: "ecommerce-gift-cards-catalysts-to-increase-holiday-season-sales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-gift-cards-crucial-for-growing-retail-businesses.md": {
	id: "ecommerce-gift-cards-crucial-for-growing-retail-businesses.md";
  slug: "ecommerce-gift-cards-crucial-for-growing-retail-businesses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-gift-cards-easy-alternatives-for-refunds-returns-and-exchanges.md": {
	id: "ecommerce-gift-cards-easy-alternatives-for-refunds-returns-and-exchanges.md";
  slug: "ecommerce-gift-cards-easy-alternatives-for-refunds-returns-and-exchanges";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-gift-cards-for-refunds.md": {
	id: "ecommerce-gift-cards-for-refunds.md";
  slug: "ecommerce-gift-cards-for-refunds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-loyalty-program.md": {
	id: "ecommerce-loyalty-program.md";
  slug: "ecommerce-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-marketing-tactics.md": {
	id: "ecommerce-marketing-tactics.md";
  slug: "ecommerce-marketing-tactics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-marketing.md": {
	id: "ecommerce-marketing.md";
  slug: "ecommerce-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-strategy-a-complete-guide.md": {
	id: "ecommerce-strategy-a-complete-guide.md";
  slug: "ecommerce-strategy-a-complete-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ecommerce-technology.md": {
	id: "ecommerce-technology.md";
  slug: "ecommerce-technology";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"essential-marketing-tools-for-2021.md": {
	id: "essential-marketing-tools-for-2021.md";
  slug: "essential-marketing-tools-for-2021";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fathers-day-ecommerce-facts-you-need-to-know.md": {
	id: "fathers-day-ecommerce-facts-you-need-to-know.md";
  slug: "fathers-day-ecommerce-facts-you-need-to-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fathers-day-retail-promotion-ideas.md": {
	id: "fathers-day-retail-promotion-ideas.md";
  slug: "fathers-day-retail-promotion-ideas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"future-ecommerce-trends.md": {
	id: "future-ecommerce-trends.md";
  slug: "future-ecommerce-trends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gamification-in-retail-industry.md": {
	id: "gamification-in-retail-industry.md";
  slug: "gamification-in-retail-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gamification-loyalty-programs.md": {
	id: "gamification-loyalty-programs.md";
  slug: "gamification-loyalty-programs";
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
"gift-card-marketing-trends.md": {
	id: "gift-card-marketing-trends.md";
  slug: "gift-card-marketing-trends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-marketing.md": {
	id: "gift-card-marketing.md";
  slug: "gift-card-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-promotions.md": {
	id: "gift-card-promotions.md";
  slug: "gift-card-promotions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-sales-on-social-media.md": {
	id: "gift-card-sales-on-social-media.md";
  slug: "gift-card-sales-on-social-media";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-scams.md": {
	id: "gift-card-scams.md";
  slug: "gift-card-scams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-card-services-for-merchants.md": {
	id: "gift-card-services-for-merchants.md";
  slug: "gift-card-services-for-merchants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-cards-can-help-businesses-overcome-economic-challenges.md": {
	id: "gift-cards-can-help-businesses-overcome-economic-challenges.md";
  slug: "gift-cards-can-help-businesses-overcome-economic-challenges";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-cards-marketing-an-absolute-solution-to-win-new-customers-this-valentine.md": {
	id: "gift-cards-marketing-an-absolute-solution-to-win-new-customers-this-valentine.md";
  slug: "gift-cards-marketing-an-absolute-solution-to-win-new-customers-this-valentine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-cards-the-gift-that-keeps-giving.md": {
	id: "gift-cards-the-gift-that-keeps-giving.md";
  slug: "gift-cards-the-gift-that-keeps-giving";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gift-cards-the-perfect-employee-reward-for-your-workforce.md": {
	id: "gift-cards-the-perfect-employee-reward-for-your-workforce.md";
  slug: "gift-cards-the-perfect-employee-reward-for-your-workforce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grow-your-business-with-these-e-commerce-tips-for-mothers-day.md": {
	id: "grow-your-business-with-these-e-commerce-tips-for-mothers-day.md";
  slug: "grow-your-business-with-these-e-commerce-tips-for-mothers-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"halloween-marketing-ideas.md": {
	id: "halloween-marketing-ideas.md";
  slug: "halloween-marketing-ideas";
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
"holiday-marketing-campaigns.md": {
	id: "holiday-marketing-campaigns.md";
  slug: "holiday-marketing-campaigns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"holiday-shoppers-take-advantage-of-early-thanksgiving-deals.md": {
	id: "holiday-shoppers-take-advantage-of-early-thanksgiving-deals.md";
  slug: "holiday-shoppers-take-advantage-of-early-thanksgiving-deals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-99minds-fits-into-your-martech-stack.md": {
	id: "how-99minds-fits-into-your-martech-stack.md";
  slug: "how-99minds-fits-into-your-martech-stack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-and-why-you-should-use-digital-rewards-for-workplace-gamification.md": {
	id: "how-and-why-you-should-use-digital-rewards-for-workplace-gamification.md";
  slug: "how-and-why-you-should-use-digital-rewards-for-workplace-gamification";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-can-small-businesses-can-increase-sales-with-gift-cards.md": {
	id: "how-can-small-businesses-can-increase-sales-with-gift-cards.md";
  slug: "how-can-small-businesses-can-increase-sales-with-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-do-coupons-work-for-businesses.md": {
	id: "how-do-coupons-work-for-businesses.md";
  slug: "how-do-coupons-work-for-businesses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-do-loyalty-programs-help-the-pet-industry.md": {
	id: "how-do-loyalty-programs-help-the-pet-industry.md";
  slug: "how-do-loyalty-programs-help-the-pet-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-halloween-inspires-e-commerce-marketing.md": {
	id: "how-halloween-inspires-e-commerce-marketing.md";
  slug: "how-halloween-inspires-e-commerce-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-is-online-ecommerce-evolving.md": {
	id: "how-is-online-ecommerce-evolving.md";
  slug: "how-is-online-ecommerce-evolving";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-personalized-experiences-are-the-key-to-driving-customer-loyalty.md": {
	id: "how-personalized-experiences-are-the-key-to-driving-customer-loyalty.md";
  slug: "how-personalized-experiences-are-the-key-to-driving-customer-loyalty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-the-average-gift-card-buyer-makes-buying-decisions.md": {
	id: "how-the-average-gift-card-buyer-makes-buying-decisions.md";
  slug: "how-the-average-gift-card-buyer-makes-buying-decisions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-attract-and-retain-generation-z-customers.md": {
	id: "how-to-attract-and-retain-generation-z-customers.md";
  slug: "how-to-attract-and-retain-generation-z-customers";
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
"how-to-capitalize-on-the-christmas-rush-using-gift-cards.md": {
	id: "how-to-capitalize-on-the-christmas-rush-using-gift-cards.md";
  slug: "how-to-capitalize-on-the-christmas-rush-using-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-create-a-successful-gift-card-campaign-for-christmas.md": {
	id: "how-to-create-a-successful-gift-card-campaign-for-christmas.md";
  slug: "how-to-create-a-successful-gift-card-campaign-for-christmas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-create-buzz-for-your-shopify-store's-loyalty-program.md": {
	id: "how-to-create-buzz-for-your-shopify-store's-loyalty-program.md";
  slug: "how-to-create-buzz-for-your-shopify-stores-loyalty-program";
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
"how-to-drive-sales-through-promotional-cards.md": {
	id: "how-to-drive-sales-through-promotional-cards.md";
  slug: "how-to-drive-sales-through-promotional-cards";
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
"how-to-get-mothers-day-gift-cards-for-your-business-to-sell-a-lot.md": {
	id: "how-to-get-mothers-day-gift-cards-for-your-business-to-sell-a-lot.md";
  slug: "how-to-get-mothers-day-gift-cards-for-your-business-to-sell-a-lot";
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
"how-to-implement-an-effective-customer-loyalty-program-into-your-shopify-store.md": {
	id: "how-to-implement-an-effective-customer-loyalty-program-into-your-shopify-store.md";
  slug: "how-to-implement-an-effective-customer-loyalty-program-into-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-increase-ecommerce-sales-47-actionable-ways.md": {
	id: "how-to-increase-ecommerce-sales-47-actionable-ways.md";
  slug: "how-to-increase-ecommerce-sales-47-actionable-ways";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-kick-off-your-sales-on-fathers-day.md": {
	id: "how-to-kick-off-your-sales-on-fathers-day.md";
  slug: "how-to-kick-off-your-sales-on-fathers-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-launch-a-customer-loyalty-rewards-program-in-time-for-halloween.md": {
	id: "how-to-launch-a-customer-loyalty-rewards-program-in-time-for-halloween.md";
  slug: "how-to-launch-a-customer-loyalty-rewards-program-in-time-for-halloween";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-make-this-your-most-successful-valentines-day-yet.md": {
	id: "how-to-make-this-your-most-successful-valentines-day-yet.md";
  slug: "how-to-make-this-your-most-successful-valentines-day-yet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-market-your-loyalty-program.md": {
	id: "how-to-market-your-loyalty-program.md";
  slug: "how-to-market-your-loyalty-program";
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
"how-to-sell-more-with-gift-cards.md": {
	id: "how-to-sell-more-with-gift-cards.md";
  slug: "how-to-sell-more-with-gift-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-use-gift-card-in-social-media-marketing.md": {
	id: "how-to-use-gift-card-in-social-media-marketing.md";
  slug: "how-to-use-gift-card-in-social-media-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-use-gift-cards-in-sms-marketing.md": {
	id: "how-to-use-gift-cards-in-sms-marketing.md";
  slug: "how-to-use-gift-cards-in-sms-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-women-in-developing-countries-can-harness-e-commerce.md": {
	id: "how-women-in-developing-countries-can-harness-e-commerce.md";
  slug: "how-women-in-developing-countries-can-harness-e-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"increase-customer-loyalty.md": {
	id: "increase-customer-loyalty.md";
  slug: "increase-customer-loyalty";
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
"inspirational-women-in-ecommerce.md": {
	id: "inspirational-women-in-ecommerce.md";
  slug: "inspirational-women-in-ecommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"internationalization-strategies-in-e-commerce.md": {
	id: "internationalization-strategies-in-e-commerce.md";
  slug: "internationalization-strategies-in-e-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpis-for-loyalty-programs.md": {
	id: "kpis-for-loyalty-programs.md";
  slug: "kpis-for-loyalty-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"last-minute-christmas-marketing-checklist-for-ecommerce.md": {
	id: "last-minute-christmas-marketing-checklist-for-ecommerce.md";
  slug: "last-minute-christmas-marketing-checklist-for-ecommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-marketing.md": {
	id: "loyalty-marketing.md";
  slug: "loyalty-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-program-examples.md": {
	id: "loyalty-program-examples.md";
  slug: "loyalty-program-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-program-for-small-business.md": {
	id: "loyalty-program-for-small-business.md";
  slug: "loyalty-program-for-small-business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-program-successful.md": {
	id: "loyalty-program-successful.md";
  slug: "loyalty-program-successful";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"loyalty-program.md": {
	id: "loyalty-program.md";
  slug: "loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marketing-tools.md": {
	id: "marketing-tools.md";
  slug: "marketing-tools";
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
"mothers-day-promotions-any-small-business-can-use.md": {
	id: "mothers-day-promotions-any-small-business-can-use.md";
  slug: "mothers-day-promotions-any-small-business-can-use";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"must-have-features-for-your-ecommerce-website.md": {
	id: "must-have-features-for-your-ecommerce-website.md";
  slug: "must-have-features-for-your-ecommerce-website";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"national-use-your-gift-card-day.md": {
	id: "national-use-your-gift-card-day.md";
  slug: "national-use-your-gift-card-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nows-the-time-to-prepare-your-business-for-the-holiday-rush.md": {
	id: "nows-the-time-to-prepare-your-business-for-the-holiday-rush.md";
  slug: "nows-the-time-to-prepare-your-business-for-the-holiday-rush";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"omnichannel-commerce.md": {
	id: "omnichannel-commerce.md";
  slug: "omnichannel-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"omnichannel-loyalty-programs.md": {
	id: "omnichannel-loyalty-programs.md";
  slug: "omnichannel-loyalty-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"omnichannel-marketing.md": {
	id: "omnichannel-marketing.md";
  slug: "omnichannel-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"online-store-credit.md": {
	id: "online-store-credit.md";
  slug: "online-store-credit";
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
"portrait-of-the-average-gift-card-shopper.md": {
	id: "portrait-of-the-average-gift-card-shopper.md";
  slug: "portrait-of-the-average-gift-card-shopper";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"promotion-marketing.md": {
	id: "promotion-marketing.md";
  slug: "promotion-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"promotional-codes.md": {
	id: "promotional-codes.md";
  slug: "promotional-codes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"reduce-return-exchange-costs-using-gift-card-loyalty-points.md": {
	id: "reduce-return-exchange-costs-using-gift-card-loyalty-points.md";
  slug: "reduce-return-exchange-costs-using-gift-card-loyalty-points";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-code.md": {
	id: "referral-code.md";
  slug: "referral-code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-link.md": {
	id: "referral-link.md";
  slug: "referral-link";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-marketing-strategy.md": {
	id: "referral-marketing-strategy.md";
  slug: "referral-marketing-strategy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-marketing-vs-affiliate-marketing.md": {
	id: "referral-marketing-vs-affiliate-marketing.md";
  slug: "referral-marketing-vs-affiliate-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-marketing.md": {
	id: "referral-marketing.md";
  slug: "referral-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-program-for-small-businesses.md": {
	id: "referral-program-for-small-businesses.md";
  slug: "referral-program-for-small-businesses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-program-ideas.md": {
	id: "referral-program-ideas.md";
  slug: "referral-program-ideas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"referral-program.md": {
	id: "referral-program.md";
  slug: "referral-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"repeat-customer.md": {
	id: "repeat-customer.md";
  slug: "repeat-customer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"restaurant-loyalty-programs.md": {
	id: "restaurant-loyalty-programs.md";
  slug: "restaurant-loyalty-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"retail-loyalty-program.md": {
	id: "retail-loyalty-program.md";
  slug: "retail-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"retention-marketing.md": {
	id: "retention-marketing.md";
  slug: "retention-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sales-promotion.md": {
	id: "sales-promotion.md";
  slug: "sales-promotion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"self-use-gift-cards-impact-on-consumer-behaviour.md": {
	id: "self-use-gift-cards-impact-on-consumer-behaviour.md";
  slug: "self-use-gift-cards-impact-on-consumer-behaviour";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sell-redeem-and-sync-gift-cards-from-your-hike-pos-with-99minds.md": {
	id: "sell-redeem-and-sync-gift-cards-from-your-hike-pos-with-99minds.md";
  slug: "sell-redeem-and-sync-gift-cards-from-your-hike-pos-with-99minds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"send-bulk-gift-cards-using-klaviyo.md": {
	id: "send-bulk-gift-cards-using-klaviyo.md";
  slug: "send-bulk-gift-cards-using-klaviyo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"send-bulk-gift-cards-with-omnisend.md": {
	id: "send-bulk-gift-cards-with-omnisend.md";
  slug: "send-bulk-gift-cards-with-omnisend";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sephoras-beauty-insider.md": {
	id: "sephoras-beauty-insider.md";
  slug: "sephoras-beauty-insider";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shopify-gift-card.md": {
	id: "shopify-gift-card.md";
  slug: "shopify-gift-card";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shopify-loyalty-app.md": {
	id: "shopify-loyalty-app.md";
  slug: "shopify-loyalty-app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shopify-loyalty-program.md": {
	id: "shopify-loyalty-program.md";
  slug: "shopify-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shopify-referral-programs.md": {
	id: "shopify-referral-programs.md";
  slug: "shopify-referral-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shopify-store-credit-guide.md": {
	id: "shopify-store-credit-guide.md";
  slug: "shopify-store-credit-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"small-business-ideas-for-valentines-day.md": {
	id: "small-business-ideas-for-valentines-day.md";
  slug: "small-business-ideas-for-valentines-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"thanksgiving-marketing-ideas.md": {
	id: "thanksgiving-marketing-ideas.md";
  slug: "thanksgiving-marketing-ideas";
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
"the-best-gift-card-for-fathers-day-2021.md": {
	id: "the-best-gift-card-for-fathers-day-2021.md";
  slug: "the-best-gift-card-for-fathers-day-2021";
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
"the-future-of-ecommerce-in-2021.md": {
	id: "the-future-of-ecommerce-in-2021.md";
  slug: "the-future-of-ecommerce-in-2021";
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
"the-role-of-technology-in-enhancing-ecommerce.md": {
	id: "the-role-of-technology-in-enhancing-ecommerce.md";
  slug: "the-role-of-technology-in-enhancing-ecommerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiered-loyalty-program.md": {
	id: "tiered-loyalty-program.md";
  slug: "tiered-loyalty-program";
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
"top-14-reasons-why-gift-cards-are-a-pandemic-proof-business-strategy.md": {
	id: "top-14-reasons-why-gift-cards-are-a-pandemic-proof-business-strategy.md";
  slug: "top-14-reasons-why-gift-cards-are-a-pandemic-proof-business-strategy";
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
"types-of-loyalty-program.md": {
	id: "types-of-loyalty-program.md";
  slug: "types-of-loyalty-program";
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
"unlocking-the-power-of-gift-cards-boosting-sales-and-customer-loyalty-on-your-shopify-store.md": {
	id: "unlocking-the-power-of-gift-cards-boosting-sales-and-customer-loyalty-on-your-shopify-store.md";
  slug: "unlocking-the-power-of-gift-cards-boosting-sales-and-customer-loyalty-on-your-shopify-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"useful-gift-card-statistics-to-know-in-2022.md": {
	id: "useful-gift-card-statistics-to-know-in-2022.md";
  slug: "useful-gift-card-statistics-to-know-in-2022";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"valentines-day-marketing-ideas.md": {
	id: "valentines-day-marketing-ideas.md";
  slug: "valentines-day-marketing-ideas";
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
"ways-to-boost-sales-this-mothers-day.md": {
	id: "ways-to-boost-sales-this-mothers-day.md";
  slug: "ways-to-boost-sales-this-mothers-day";
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
"what-are-the-benefits-of-loyalty-programs.md": {
	id: "what-are-the-benefits-of-loyalty-programs.md";
  slug: "what-are-the-benefits-of-loyalty-programs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"what-constitutes-a-good-loyalty-program.md": {
	id: "what-constitutes-a-good-loyalty-program.md";
  slug: "what-constitutes-a-good-loyalty-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"what-is-an-ecommerce-gift-card-and-how-does-it-work.md": {
	id: "what-is-an-ecommerce-gift-card-and-how-does-it-work.md";
  slug: "what-is-an-ecommerce-gift-card-and-how-does-it-work";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"what-is-the-future-of-e-commerce-in-the-next-5-10-years.md": {
	id: "what-is-the-future-of-e-commerce-in-the-next-5-10-years.md";
  slug: "what-is-the-future-of-e-commerce-in-the-next-5-10-years";
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
"why-are-gift-cards-important-for-ecommerce-marketplaces.md": {
	id: "why-are-gift-cards-important-for-ecommerce-marketplaces.md";
  slug: "why-are-gift-cards-important-for-ecommerce-marketplaces";
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
"why-should-every-business-be-a-digital-business.md": {
	id: "why-should-every-business-be-a-digital-business.md";
  slug: "why-should-every-business-be-a-digital-business";
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
"why-would-a-business-want-a-gift-card-program.md": {
	id: "why-would-a-business-want-a-gift-card-program.md";
  slug: "why-would-a-business-want-a-gift-card-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-you-should-use-gift-cards-as-your-halloween-treats.md": {
	id: "why-you-should-use-gift-cards-as-your-halloween-treats.md";
  slug: "why-you-should-use-gift-cards-as-your-halloween-treats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-your-business-needs-gift-cards-this-valentines.md": {
	id: "why-your-business-needs-gift-cards-this-valentines.md";
  slug: "why-your-business-needs-gift-cards-this-valentines";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"word-of-mouth-marketing.md": {
	id: "word-of-mouth-marketing.md";
  slug: "word-of-mouth-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
