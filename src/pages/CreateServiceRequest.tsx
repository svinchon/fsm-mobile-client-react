import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonNote, useIonToast, IonImg
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useEffect, useState } from 'react';
import './CreateServiceRequest.css';

const CreateServiceRequest: React.FC = () => {

  const [customerId, setCustomerId] = useState('USR1008');
  const [problemDescription, setProblemDescription] = useState('Fridge not cooling');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fsmDeployedAppName, setFsmDeployedAppName] = useState('');
  const [fsmAppConnectorUrl, setFsmAppConnectorUrl] = useState('');
  const [fsmUserEmail, setFsmUserEmail] = useState('');

  const [touched, setTouched] = useState({
    customerId: false,
    problemDescription: false,
  });

  const [present] = useIonToast();

  useEffect(() => {
    const savedFsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');
    const savedFsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const savedFsmUserEmail = localStorage.getItem('fsmUserEmail');
    setFsmDeployedAppName(savedFsmDeployedAppName ?? '');
    setFsmAppConnectorUrl(savedFsmAppConnectorUrl ?? '');
    setFsmUserEmail(savedFsmUserEmail ?? '');
  }, []);

  const isFormValid =
    customerId.length > 0 &&
    problemDescription.length > 0 &&
    !!imageUrl &&
    fsmDeployedAppName.length > 0 &&
    fsmAppConnectorUrl.length > 0 &&
    fsmUserEmail.length > 0;

  const submit = async () => {
    if (!imageUrl) {
      present({ message: 'Please take a picture first.', duration: 2000, color: 'danger' });
      return;
    }
    if (!fsmAppConnectorUrl || !fsmDeployedAppName || !fsmUserEmail) {
      present({ message: 'Please set FSM settings first.', duration: 2000, color: 'danger' });
      return;
    }

    try {
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const mimeType = imageBlob.type || 'image/jpeg';
      const ext = mimeType.includes('/') ? mimeType.split('/')[1] : 'jpg';
      const fileName = `service-request.${ext}`;
      const pictureFile = new File([imageBlob], fileName, { type: mimeType });

      const params = new URLSearchParams({
        customerId,
        problemDescription,
        fileName,
        deployedAppName: fsmDeployedAppName,
        userEmail: fsmUserEmail,
      });

      const baseUrl = fsmAppConnectorUrl.replace(/\/+$/, '');
      const url = `${baseUrl}/api/createServiceRequest?${params.toString()}`;

      const formData = new FormData();
      formData.append('picture', pictureFile);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: '*/*',
        },
        body: formData,
      });

      if (response.ok) {
        present({ message: 'Service request created successfully.', duration: 2000, color: 'success' });
      } else {
        const errorText = await response.text();
        present({
          message: `Create request failed: ${errorText || response.status}`,
          duration: 3000,
          color: 'danger'
        });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      present({ message: `Create request failed: ${message}`, duration: 3000, color: 'danger' });
    }
  };

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
        <IonButton expand="block" onClick={takePicture}>
          Take Picture
        </IonButton>
        {imageUrl && <IonImg className="csr-image" src={imageUrl} />}
        <IonButton
          expand="block"
          disabled={!isFormValid}
          onClick={submit}
        >
          Create Service Request
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default CreateServiceRequest;
