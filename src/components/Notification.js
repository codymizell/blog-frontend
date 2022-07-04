import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification) return;

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div id='notification' style={style}>
      {notification}
    </div>
  );
};

export default Notification;