import React from 'react';
import VideoCard from './VideoCard';

export default function VideoList({ videos }) {
  return (
    <div className="flex flex-wrap -m-4">
      {videos.length === 0 ? (
        <h1>No videos to display</h1>
      ) : (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
}
