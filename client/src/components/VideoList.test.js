import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
  waitForElement,
} from '@testing-library/react';
import VideoList from './VideoList';
import ReactModal from 'react-modal';

const fakeVideos = [
  {
    _id: '1',
    title: 'video1.mp4',
    screenshot: 'screenshot1.png',
    duration: 125.8,
    video_codec: 'video_codec',
    audio_codec: 'audio_codec',
  },
  {
    _id: '2',
    title: 'video2.mp4',
    screenshot: 'screenshot2.png',
    duration: 125.8,
    video_codec: 'video_codec',
    audio_codec: 'audio_codec',
  },
  {
    _id: '3',
    title: 'video3.mp4',
    screenshot: 'screenshot3.png',
    duration: 125.8,
    video_codec: 'video_codec',
    audio_codec: 'audio_codec',
  },
];

ReactModal.setAppElement('*');

describe('VideoList', () => {
  afterEach(cleanup);

  test('Match snapshot', () => {
    const wrapper = render(<VideoList videos={fakeVideos} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Shows message when there are no videos', () => {
    const { getByText } = render(<VideoList />);
    expect(getByText(/No videos to display/i)).toBeInTheDocument();
  });

  test('Opens the modal when a video is clicked', async () => {
    const { getAllByTestId, queryByText, debug } = render(
      <VideoList videos={fakeVideos} />
    );
    const selectButtons = getAllByTestId('select');
    expect(selectButtons).toHaveLength(3);
    expect(queryByText(/close/i)).not.toBeInTheDocument();

    fireEvent.click(selectButtons[0]);
    expect(queryByText(/close/i)).toBeInTheDocument();
  });
});
