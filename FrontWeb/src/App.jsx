import { useEffect, useReducer } from 'react';
import { authReducer } from './modules/auth/authReducer';
import { AuthContext } from './modules/auth/authContext';
import { AppRouter } from './shared/components/AppRouter';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { isLogged: false };
};

const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ dispatch, user }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
