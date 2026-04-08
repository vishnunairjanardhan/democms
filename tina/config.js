import { defineConfig } from "tinacms";
import { authors } from "../src/config/authorConfig.js";
import { AuthorImgField } from "./AuthorImgField.jsx";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Build author dropdown options from authorConfig
const authorOptions = Object.keys(authors).map((name) => ({
  value: name,
  label: name,
}));

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.name || "author",
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "img",
            label: "Profile Photo",
            required: true,
          },
          {
            type: "string",
            name: "designation",
            label: "Designation",
          },
          {
            type: "string",
            name: "bio",
            label: "Bio",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "linkedin",
            label: "LinkedIn URL",
          },
          {
            type: "string",
            name: "twitter",
            label: "Twitter / X URL",
          },
        ],
      },
      {
        name: "posts",
        label: "Blog Posts",
        path: "src/content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heading",
            label: "Heading",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publication Date",
            required: true,
          },
          {
            type: "datetime",
            name: "lastUpdated",
            label: "Last Updated",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            options: authorOptions,
          },
          {
            type: "string",
            name: "authorImg",
            label: "Author Image",
            required: true,
            ui: {
              component: AuthorImgField,
            },
          },
          {
            type: "object",
            name: "image",
            label: "Featured Image",
            fields: [
              {
                type: "image",
                name: "url",
                label: "Image URL",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "url",
            label: "Post URL",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
