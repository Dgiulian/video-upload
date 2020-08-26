import React from 'react';
import { render, cleanup, within } from '@testing-library/react';
import VideoCard from './VideoCard';

afterEach(cleanup);

const videoProp = {
  _id: '123456',
  title: 'video title.mp4',
  screenshot: 'screenshot.png',
  duration: 135.8,
  video_codec: '',
  audio_codec: '',
};

describe('Video Card', () => {
  test('it renders correctly', () => {
    const { getByText, getByTestId, debug } = render(
      <VideoCard video={videoProp} />
    );

    const titleElement = getByText('video title.mp4');
    const durationElement = getByTestId('duration');
    const screenshot = getByTestId('screenshot');

    expect(titleElement).toBeInTheDocument();
    expect(durationElement.textContent).toBe('02:15');
    expect(screenshot).toHaveAttribute(
      'src',
      'http://localhost:3005/screenshots/screenshot.png'
    );
  });

  test('it calls onDelete function with the appropiate argument', () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <VideoCard video={videoProp} onDelete={onDelete} />
    );
    const deleteButton = getByTestId('delete');
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('123456');
  });

  test('it calls onVideoSelect function with the appropiate argument', () => {
    const onVideoSelect = jest.fn();
    const { getByTestId } = render(
      <VideoCard video={videoProp} onVideoSelect={onVideoSelect} />
    );
    const selectButton = getByTestId('select');
    selectButton.click();
    expect(onVideoSelect).toHaveBeenCalledTimes(1);
    expect(onVideoSelect).toHaveBeenCalledWith('123456');
  });
});
