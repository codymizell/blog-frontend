import { useSelector } from 'react-redux';
import { Alert, } from '@mui/material';


const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) return;

  return (
    <Alert severity="info">
      {notification}
    </Alert>
  );
};

export default Notification;