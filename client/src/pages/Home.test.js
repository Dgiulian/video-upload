import React from 'react';
import {
  render,
  cleanup,
  waitFor,
  getByText,
  wait,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
const BASE_URL = 'http://localhost:3005';

const fakeVideos = [
  {
    _id: '5f453812216486485cdded57',
    title: 'TiraCerveza.mp4',
    path: 'uploads/7c939d8d9abfbbefb8ce9eb216492ef7',
    extension: '.mp4',
    video_codec: 'h264',
    audio_codec: '',
    duration: 3.98,
    width: 640,
    height: 1138,
    screenshot: '7c939d8d9abfbbefb8ce9eb216492ef7.png',
    __v: 0,
  },
];

let server = setupServer(
  rest.get(`${BASE_URL}/videos/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeVideos));
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add a request handler for ${req.url.toString()}`);
    return rex(
      ctx.status(500),
      ctx.text(`Please add a request handler for ${req.url.toString()}`)
    );
  })
);

const WrappedHome = (props) => {
  return (
    <Router>
      <Home {...props} />
    </Router>
  );
};
describe('Home Page', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  test('It renders the video list', async () => {
    const { queryByTestId } = render(<WrappedHome />);
    await waitFor(() =>
      expect(queryByTestId(/video-card/i)).toBeInTheDocument()
    );
  });
  /*   xtest('It renders loading while the api is made', async () => {
    //    useQuery.mockReturnValueOnce({ status: 'loading', data: [], error: false });

    const { getByText, debug } = render(<WrappedHome />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });
  test.only('It renders error when no video is returned', async () => {
    server.use(
      rest.get(`${BASE_URL}/videos/`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json([]));
      })
    );
    const { getByText, debug } = render(<WrappedHome />);
    await waitFor(() =>
      expect(getByText(/an error has occured/i)).toBeInTheDocument()
    );
  }); */
});
