import React, { useState } from 'react';
import { uploadVideos } from '../api';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import UploadFileList from '../components/UploadFileList';

export function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const handleUploadFiles = (files) => {
    setIsLoading(true);
    setFileList(files);
    uploadVideos(files).then(() => history.push('/'));
  };
  return (
    <Layout>
      {isLoading ? (
        <UploadFileList files={fileList} />
      ) : (
        <UploadForm onUploadFiles={handleUploadFiles} />
      )}
    </Layout>
  );
}
