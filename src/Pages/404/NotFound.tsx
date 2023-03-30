import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface IProps {
  is404: (yes: boolean) => void;
}

const NotFound = ({ is404 }: IProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    is404(true);
    return () => {
      is404(false);
    };
  }, []);

  return (
    <div>
      <h2>NotFound</h2>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default NotFound;
