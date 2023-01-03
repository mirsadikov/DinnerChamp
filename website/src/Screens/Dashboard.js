import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.restaurant);
  const { info } = user;

  useEffect(() => {
    if (!info) {
      navigate('/login');
    }
  }, [info, navigate]);

  return (
    <div>
      <h1 className="">Dashboard</h1>
    </div>
  );
}
