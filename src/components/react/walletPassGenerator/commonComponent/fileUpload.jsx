export const FileUpload = ({
  label,
  url,
  stateKey,
  updatePassData,
  fileOnChange,
}) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4 border border-gray-300 rounded-lg p-3">
        {url && (
          <div className="relative">
            <img
              src={url}
              alt="Organization logo"
              className="h-12 w-12 object-contain rounded"
            />
            <button
              onClick={() => updatePassData(stateKey, "")}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              title="Clear image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="flex flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => fileOnChange(e, stateKey)}
            className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </div>
  );
};
