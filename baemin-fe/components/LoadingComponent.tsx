import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const LoadingComponent: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  if (!loading) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;
