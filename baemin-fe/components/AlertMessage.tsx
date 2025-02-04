// components/AlertMessage.tsx
'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { RootState } from '@/app/store';
import { hideAlert } from '@/app/store/alertSlice';

const AlertMessage: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);

  if (!alert.visible) return null;

  return (
    <Alert
      message={alert.message}
      description={alert.description}
      type={alert.type}
      showIcon
      closable
      onClose={() => dispatch(hideAlert())}
      style={{ marginBottom: '16px' }}
    />
  );
};

export default AlertMessage;
