import React from 'react';
import Modal from 'react-modal';

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
      <button onClick={closeModal}>Close</button>
      <video
        src={`http://localhost:3005/videos/stream/${videoId}`}
        controls={true}
        autoPlay
      />
    </Modal>
  );
}
