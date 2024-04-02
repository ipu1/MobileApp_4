import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../firebaseConfig';
import { IonContent, IonPage, IonInput, IonButton, IonToast } from '@ionic/react';

const Tab1: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string>('');

  React.useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully!');
      // Redirect or navigate to the next page upon successful login
    } catch (error) {
      console.error('Error signing in:', error.message);
      setToastMessage(error.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        <IonInput type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        <IonButton onClick={handleLogin}>Login</IonButton>
        <IonToast isOpen={showToast} message={toastMessage} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;