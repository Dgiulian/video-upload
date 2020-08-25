import React from 'react';
import Layout from '../components/Layout';
import VideoList from '../components/VideoList';
import { getVideos } from '../api';
import { useQuery } from '../hooks/useQuery';

export function Home() {
  const { error, loading, data } = useQuery(getVideos);

  return (
    <Layout>
      {error && <h1>An error has occured</h1>}
      {loading && <h1>Loading...</h1>}
      {!error && !loading && <VideoList videos={data} />}
    </Layout>
  );
}
