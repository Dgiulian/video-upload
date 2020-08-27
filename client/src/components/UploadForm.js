import React, { useState } from 'react';

export default function UploadForm({ onUploadFiles }) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const handleFileSelect = (e) => {
    onUploadFiles(e.target.files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();

    setIsDraggedOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('video/')
    );
    onUploadFiles(files);
  };
  return (
    <form>
      <div>
        <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <h2 className="leading-6 font-medium text-gray-700 text-lg">
              Upload Videos
            </h2>
            <div
              className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                isDraggedOver ? 'border-blue-300' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="drop-files"
            >
              <div className="text-center">
                <svg
                  className={`mx-auto h-12 w-12 ${
                    isDraggedOver ? 'text-blue-300' : 'text-gray-300'
                  }`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <label
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out mr-1 cursor-pointer "
                  >
                    Upload a video
                    <input
                      type="file"
                      multiple={true}
                      className="hidden"
                      onChange={handleFileSelect}
                      accept="video/*"
                      name="videos"
                    />
                  </label>
                  or drag and drop
                </p>
                {/* <p className="mt-1 text-xs text-gray-500">
                  Mp4, Flv, GIF up to 10MB
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*       <div className="mt-8 border-t border-gray-200 pt-5">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <Link
              to="/"
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
            >
              Cancel
            </Link>
          </span>
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Save
            </button>
          </span>
        </div>
      </div> */}
    </form>
  );
}
