import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUser } from '../features/UserSlice';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser());
      setLoading(false); 
    };

    fetchUser();

    if (user !== null) {
      navigate('/');
    }
  }, [dispatch, navigate, user]);

  return (
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16 border-4 mx-auto"></div>
          <h1 className="mt-4 text-xl font-semibold text-white">Checking your account...</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Redirecting...</h1>
          <p className="text-white mt-2">You will be redirected shortly.</p>
        </div>
      )}
    </div>
  );
};

export default Redirect;
