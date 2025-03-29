import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { hideAlert } from '@/app/store/alertSlice';
import { RootState } from '@/app/store';

const AlertMessage: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer when component unmounts or alert changes
    }
  }, [alert.visible, dispatch]);

  if (!alert.visible) return null;

  return (
    <Alert
      message={alert.message}
      description={alert.description}
      type={alert.type}
      showIcon
      closable
      onClose={() => dispatch(hideAlert())}
      style={{ marginBottom: '16px', zIndex: 200 }}
    />
  );
};

export default AlertMessage;