import React from 'react';
import { formatSeconds } from '../utils/date';
import TrashFillIcon from './TrashFillIcon';

export default function VideoCard({ video, onVideoSelect, onDelete }) {
  const screenshot = video.screenshot
    ? `${process.env.REACT_APP_API_URL}/screenshots/${video.screenshot}`
    : 'https://dummyimage.com/420x260';
  const duration = formatSeconds(video.duration);
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <button
        className="block relative h-48 rounded overflow-hidden"
        onClick={() => onVideoSelect(video._id)}
        data-testid="select"
      >
        <img
          alt="screenshot"
          className="object-cover object-center w-full h-full block"
          src={screenshot}
          data-testid="screenshot"
        />
      </button>
      <div className="flex justify-between items-center">
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {video.video_codec} /{' '}
            {video.audio_codec ? video.audio_codec : 'No audio'}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {video.title}
          </h2>

          <p className="mt-1" data-testid="duration">
            {duration}
          </p>
        </div>
        <button onClick={() => onDelete(video._id)} data-testid="delete">
          <TrashFillIcon className="text-red-600 pointer" />
        </button>
      </div>
    </div>
  );
}
