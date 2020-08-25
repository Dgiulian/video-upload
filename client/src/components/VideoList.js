import React, { useState } from 'react';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import { deleteVideo } from '../api';

export default function VideoList({ videos }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const handleVideoSelect = (id) => {
    setModalIsOpen(true);
    setVideoId(id);
  };
  const handleOnDelete = (id) => {
    if (!id) {
      return;
    }
    const response = window.confirm(
      'Are you sure you want to delete the video?'
    );
    if (response) {
      deleteVideo(id);
    }
  };
  return (
    <div className="flex flex-wrap -m-4">
      {videos.length === 0 ? (
        <h1>No videos to display</h1>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            onVideoSelect={handleVideoSelect}
            onDelete={handleOnDelete}
          />
        ))
      )}
      <VideoPlayer
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        videoId={videoId}
      />
    </div>
  );
}
