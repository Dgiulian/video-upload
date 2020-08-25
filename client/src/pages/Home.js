import React from 'react';
import { useQuery } from 'react-query';
import { getVideos } from '../api';
import Layout from '../components/Layout';
import VideoList from '../components/VideoList';

export function Home() {
  const { status, data, error } = useQuery('videos', getVideos);
  return (
    <Layout>
      {status === 'error' && <h1>An error has occured {error.message}</h1>}
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'success' && <VideoList videos={data} />}
    </Layout>
  );
}
