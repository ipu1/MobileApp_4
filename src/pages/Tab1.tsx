import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { IonContent, IonPage, IonInput, IonButton, IonToast, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import './pages.css';

const Tab1: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully!');
      // Redirect or navigate to the next page upon successful login
    } catch (error) {
      console.error('Error signing in:', error.message);
      setErrorMessage("Wrong credentials! TRY AGAIN!!!");
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-form">
          <h1>Login</h1>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
          {showError && <IonText color="danger">{errorMessage}</IonText>}
          <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;