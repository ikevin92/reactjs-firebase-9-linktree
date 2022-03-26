import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth, userExists } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  /*
  State
  0: inicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  */
  const [currentState, setCurrentState] = useState(0);

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentState(1);
    //validando autenticacion
    onAuthStateChanged(auth, handleUserStateChanged);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      //se valida en la bd si existe el usuario
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        // TODO: redirigir a dashboard
        navigate('/dashboard');
        setCurrentState(2);
      } else {
        // TODO: redirigir a choose-username
        navigate('/choose-username');
        setCurrentState(3);
      }
    } else {
      setCurrentState(4);
      console.log('no hay nadie autenticado...');
    }
  };

  if (currentState === 2) {
    return <div>Estas autenticado y registrado</div>;
  }
  if (currentState === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }
  if (currentState === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login With Google</button>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default LoginView;
