import React from 'react';
import Modal from 'react-modal';
import { formatRelative } from 'date-fns/esm';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    /* bottom: 'auto', */
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function VideoPlayer({ isOpen, closeModal, videoId }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <button
        onClick={closeModal}
        className="absolute right-0 mr-4 pointer z-10"
      >
        Close
      </button>
      <video
        src={`http://localhost:3005/videos/stream/${videoId}`}
        controls={true}
        autoPlay
        loop
        className="object-contain object-center w-full h-full block"
      />
    </Modal>
  );
}
