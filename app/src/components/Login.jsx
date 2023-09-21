import React, { useEffect } from 'react';
import useGlobalStore from '../store/globalStore';

const Login = () => {
  useEffect(() => {
    useGlobalStore.setState({ userId: 'rzGXmlC15rbKndUyyRIz' });
  }, []);

  const userId = useGlobalStore(state => state.userId);

  console.log('userId', userId);

  return <div />;
};

export default Login;
