import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import UploadForm from './UploadForm';

describe('UploadForm', () => {
  afterEach(cleanup);

  test('It matches snapshot', () => {
    const wrapper = render(<UploadForm />);
    expect(wrapper).toMatchSnapshot();
  });

  test('onUploadFiles is called when files are selected', () => {
    const onUploadFiles = jest.fn();
    const { getByLabelText } = render(
      <UploadForm onUploadFiles={onUploadFiles} />
    );
    const inputEl = getByLabelText('Upload a video');
    fireEvent.change(inputEl);
    expect(onUploadFiles).toHaveBeenCalled();
  });

  test('onUploadFiles is called when files are dropped', () => {
    const onUploadFiles = jest.fn();
    const { getByTestId, debug } = render(
      <UploadForm onUploadFiles={onUploadFiles} />
    );
    const dropEl = getByTestId('drop-files');
    const fakeFiles = [
      {
        title: 'file1.mp4',
        type: 'video/mp4',
      },
      {
        title: 'file2.mp4',
        type: 'plain/txt',
      },
      {
        title: 'file3.mp4',
        type: 'video/flv',
      },
    ];
    const filteredFiles = fakeFiles.filter((file) =>
      file.type.startsWith('video')
    );
    fireEvent.drop(dropEl, { dataTransfer: { files: fakeFiles } });
    expect(onUploadFiles).toHaveBeenCalledWith(filteredFiles);
  });
});
