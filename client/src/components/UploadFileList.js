import React from 'react';
import { formatSizeUnits } from '../utils/file';

export default function UploadFileList({ files }) {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <h2 className=" leading-6 font-medium text-gray-700 text-lg mb-4">
        Uploading files...
      </h2>
      <ul className="w-xs">
        {Array.from(files).map((file) => (
          <li key={file.name} className="flex justify-between">
            <span className="text-gray-600">{file.name}</span>
            <span>{formatSizeUnits(file.size)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
