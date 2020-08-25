import React from 'react';
import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import { uploadFiles } from '../api';

export function Upload() {
  const handleUploadFiles = (files) => {
    uploadFiles(files);
  };
  return (
    <Layout>
      <UploadForm onUploadFiles={handleUploadFiles} />
    </Layout>
  );
}
