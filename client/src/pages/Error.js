import React from 'react';
import Layout from '../components/Layout';

export function Error() {
  return (
    <Layout>
      <section className="flex h-100 align-middle">
        <h1 className="text-xl mx-auto">The page could not be found</h1>
      </section>
    </Layout>
  );
}
