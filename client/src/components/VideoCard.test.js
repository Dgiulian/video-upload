import React from 'react';
import { render, cleanup, within } from '@testing-library/react';
import VideoCard from './VideoCard';

afterEach(cleanup);

const videoProp = {
  _id: '123456',
  title: 'video title.mp4',
  screenshot: 'screenshot.png',
  duration: 135.8,
  video_codec: 'h264',
  audio_codec: 'aac',
};

describe('Video Card', () => {
  test('it match snapshot', () => {
    const wrapper = render(<VideoCard video={videoProp} />);
    expect(wrapper).toMatchSnapshot();
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
