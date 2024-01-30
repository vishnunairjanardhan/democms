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
"1.md": {
	id: "1.md";
  slug: "1";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"5.md": {
	id: "5.md";
  slug: "5";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"9-ways-to-increase-gift-card-sales-using-social-media.md": {
	id: "9-ways-to-increase-gift-card-sales-using-social-media.md";
  slug: "9-ways-to-increase-gift-card-sales-using-social-media";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"Buzz.md": {
	id: "Buzz.md";
  slug: "buzz";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"Pandemic.md": {
	id: "Pandemic.md";
  slug: "pandemic";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"ai-for-everyone.md": {
	id: "ai-for-everyone.md";
  slug: "ai-for-everyone";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"ai-helps-to-make-pizza-more-delicious.md": {
	id: "ai-helps-to-make-pizza-more-delicious.md";
  slug: "ai-helps-to-make-pizza-more-delicious";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"ai-implementation-in-e-commerce.md": {
	id: "ai-implementation-in-e-commerce.md";
  slug: "ai-implementation-in-e-commerce";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"case-study-8-brilliant-loyalty-program-cases-in-2024.md": {
	id: "case-study-8-brilliant-loyalty-program-cases-in-2024.md";
  slug: "case-study-8-brilliant-loyalty-program-cases-in-2024";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"customer-retention-and-acquisition-using-ai.md": {
	id: "customer-retention-and-acquisition-using-ai.md";
  slug: "customer-retention-and-acquisition-using-ai";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to--capitalize-on-the-christmas-rush-using-gift-cards.md": {
	id: "how-to--capitalize-on-the-christmas-rush-using-gift-cards.md";
  slug: "how-to--capitalize-on-the-christmas-rush-using-gift-cards";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-engage-customers-post-holidays-with-gift-card-incentives.md": {
	id: "how-to-engage-customers-post-holidays-with-gift-card-incentives.md";
  slug: "how-to-engage-customers-post-holidays-with-gift-card-incentives";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-market-your-shopify-gift-card-program-effectively.md": {
	id: "how-to-market-your-shopify-gift-card-program-effectively.md";
  slug: "how-to-market-your-shopify-gift-card-program-effectively";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"how-to-set-up-a-loyalty-program-on-shopify-in-2024.md": {
	id: "how-to-set-up-a-loyalty-program-on-shopify-in-2024.md";
  slug: "how-to-set-up-a-loyalty-program-on-shopify-in-2024";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify.md": {
	id: "increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify.md";
  slug: "increasing-repeat-purchases-how-gift-cards-and-loyalty-programs-can-drive-customer-lifetime-value-on-shopify";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"the-green-revolution-digital-gift-cards-vs-plastic-gift-cards.md": {
	id: "the-green-revolution-digital-gift-cards-vs-plastic-gift-cards.md";
  slug: "the-green-revolution-digital-gift-cards-vs-plastic-gift-cards";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"the-rise-of-gift-card-popularity-in-the-ecommerce-era.md": {
	id: "the-rise-of-gift-card-popularity-in-the-ecommerce-era.md";
  slug: "the-rise-of-gift-card-popularity-in-the-ecommerce-era";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"the-roi-of-a-robust-loyalty-program-for-shopify-merchants.md": {
	id: "the-roi-of-a-robust-loyalty-program-for-shopify-merchants.md";
  slug: "the-roi-of-a-robust-loyalty-program-for-shopify-merchants";
  body: string;
  collection: "posts";
  data: any
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

	type ContentConfig = never;
}
