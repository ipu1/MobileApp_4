import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonText } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';
import './pages.css';

const Tab2: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
      // Redirect or navigate to the next page upon successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="form-container">
          <h1>Register</h1>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
          {showError && <IonText color="danger">{errorMessage}</IonText>}
          <p className="login-link">Already have an account? <Link to="/tab1">Login</Link></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
