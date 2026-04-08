import React from "react";
import { authors } from "../src/config/authorConfig.js";

// authorConfig.js still uses short filenames; build full path for preview
const authorImageMap = Object.fromEntries(
  Object.entries(authors).map(([name, data]) => [name, data.img])
);

export const AuthorImgField = ({ input, form }) => {
  React.useEffect(() => {
    const unsubscribe = form.subscribe(
      (state) => {
        const authorName = state.values?.author;
        const expectedImg = authorName ? authorImageMap[authorName] || "" : "";
        if (expectedImg && state.values?.authorImg !== expectedImg) {
          form.change("authorImg", expectedImg);
        }
      },
      { values: true }
    );
    return unsubscribe;
  }, []);

  const authorName = form.getState().values?.author;
  const imgFilename = input.value || "";
  const imgPreviewSrc = imgFilename
    ? `/assets/testimonial/${imgFilename}`
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "4px" }}>
      <label
        style={{ fontSize: "13px", fontWeight: "600", color: "#374151", display: "block" }}
      >
        Author Image
        <span style={{ fontWeight: 400, color: "#9ca3af", marginLeft: "6px" }}>
          (auto-filled from Author)
        </span>
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {imgPreviewSrc ? (
          <img
            src={imgPreviewSrc}
            alt={authorName || "Author"}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #e5e7eb",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#f3f4f6",
              border: "2px dashed #d1d5db",
              flexShrink: 0,
            }}
          />
        )}
        <input
          type="text"
          value={imgFilename}
          readOnly
          placeholder="Select an author above…"
          style={{
            flex: 1,
            padding: "8px 12px",
            background: "#f9fafb",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            color: imgFilename ? "#374151" : "#9ca3af",
            cursor: "not-allowed",
          }}
        />
      </div>
    </div>
  );
};
