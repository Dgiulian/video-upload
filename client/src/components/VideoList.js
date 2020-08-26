import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { deleteVideo } from '../api';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';

export default function VideoList({ videos }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [mutate] = useMutation(deleteVideo);
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
      mutate(id).then(() => {
        queryCache.invalidateQueries('videos');
      });
    }
  };
  return (
    <div className="flex flex-wrap -m-4">
      {!videos || !videos.length ? (
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
