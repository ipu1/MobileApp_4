import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonToast } from '@ionic/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../firebaseConfig';

const Tab2: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleRegistration = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!');
      // Redirect or navigate to the next page upon successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        <IonButton onClick={handleRegistration}>Register</IonButton>
        <IonToast isOpen={showToast} message={toastMessage} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
