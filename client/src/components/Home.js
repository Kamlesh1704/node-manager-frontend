import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <AddNote showAlert={showAlert} />
    </div>
  );
}

export default Home;
