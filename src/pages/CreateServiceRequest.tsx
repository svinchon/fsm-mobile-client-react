import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonNote, useIonToast, IonImg
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

const CreateServiceRequest: React.FC = () => {

  const [customerId, setCustomerId] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  // const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [touched, setTouched] = useState({
    customerId: false,
    problemDescription: false,
    // password: false
  });

  const [present] = useIonToast();

  // const isEmailValid = (v: string) =>
  //   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // const isFormValid =
  //   customerId.length > 0 &&
  //   problemDescription.length > 0 &&
  //   password.length >= 6;

  // const submit = () => {
  //   present(`Welcome ${customerId} 👋`, 2000);
  // };

  const takePicture = async () => {
    try {
      console.log('Taking picture...');
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });
      console.log('Taking picture end...');

      if (image.webPath) {
        setImageUrl(image.webPath);
      }
    } catch (error: unknown) {
      // Don't show an error if the user cancelled the action
      if (error instanceof Error && error.message !== 'User cancelled photos app') {
        present({ message: `Error taking picture: ${error.message}`, duration: 3000, color: 'danger' });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Service Request</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Customer Id */}
        <IonItem>
          <IonLabel position="stacked">Customer Id</IonLabel>
          <IonInput
            value={customerId}
            onIonChange={e => setCustomerId(e.detail.value!)}
            onIonBlur={() => setTouched(t => ({...t, customerId: true}))}
          />
        </IonItem>
        {touched.customerId && !customerId && (
          <IonNote color="danger">Error</IonNote>
        )}

        {/* Problem Description */}
        <IonItem>
          <IonLabel position="stacked">Problem Description</IonLabel>
          <IonTextarea
            rows={5}
            value={problemDescription}
            onIonChange={e => setProblemDescription(e.detail.value!)}
            onIonBlur={() => setTouched(t => ({...t, problemDescription: true}))}
          />
        </IonItem>
        {touched.problemDescription && !problemDescription && (
          <IonNote color="danger">Error</IonNote>
        )}

        {/* take picture */}
        <IonButton expand="block" onClick={takePicture}>
          Take Picture
        </IonButton>

        {imageUrl && <IonImg src={imageUrl} />}


        {/* <IonButton
          expand="block"
          disabled={!isFormValid}
          onClick={submit}
        >
          Créer mon compte
        </IonButton> */}

      </IonContent>
    </IonPage>
  );
};

export default CreateServiceRequest;
