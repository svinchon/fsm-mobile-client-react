import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons, IonMenuButton, useIonToast
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CreateServiceRequest.css';
import { fetchWithTimeout } from '../utils/http';
import { useGlobalStatus } from '../state/global-status';
import { cameraOutline, sendOutline, trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const CreateServiceRequest: React.FC = () => {

  const [problemDescription, setProblemDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fsmDeployedAppName, setFsmDeployedAppName] = useState('');
  const [fsmAppConnectorUrl, setFsmAppConnectorUrl] = useState('');
  const [rappitUserEmail, setRappitUserEmail] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const { setStatus } = useGlobalStatus();
  const history = useHistory();
  const [present] = useIonToast();
  const { t } = useTranslation();

  useEffect(() => {
    setFsmDeployedAppName(localStorage.getItem('fsmDeployedAppName') ?? '');
    setFsmAppConnectorUrl(localStorage.getItem('fsmAppConnectorUrl') ?? '');
    setRappitUserEmail(localStorage.getItem('rappitUserEmail') ?? '');
    setIsTestMode(localStorage.getItem('isTestMode') === 'true');
  }, []);

  const isFormValid =
    problemDescription.length > 0 &&
    !!imageUrl &&
    fsmDeployedAppName.length > 0 &&
    fsmAppConnectorUrl.length > 0 &&
    rappitUserEmail.length > 0;

  const submit = async () => {
    if (!imageUrl) {
      present({ message: t('csr.toast_no_photo'), duration: 2000, color: 'danger' });
      return;
    }
    if (!fsmAppConnectorUrl || !fsmDeployedAppName || !rappitUserEmail) {
      present({ message: t('csr.toast_no_settings'), duration: 2000, color: 'danger' });
      return;
    }

    try {
      const imageResponse = await fetchWithTimeout(imageUrl);
      const imageBlob = await imageResponse.blob();
      const mimeType = imageBlob.type || 'image/jpeg';
      const ext = mimeType.includes('/') ? mimeType.split('/')[1] : 'jpg';
      const fileName = `service-request.${ext}`;
      const pictureFile = new File([imageBlob], fileName, { type: mimeType });

      const params = new URLSearchParams({
        customerId: rappitUserEmail,
        problemDescription,
        fileName,
        deployedAppName: fsmDeployedAppName,
        rappitUserEmail: rappitUserEmail,
        isTestMode: String(isTestMode),
      });

      const baseUrl = fsmAppConnectorUrl.replace(/\/+$/, '');
      const url = `${baseUrl}/api/createServiceRequest?${params.toString()}`;

      const formData = new FormData();
      formData.append('picture', pictureFile);

      setStatus('Creating service request...', 'medium', 10000, true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { accept: '*/*' },
        body: formData,
      });

      if (response.ok) {
        setStatus('Service request created successfully...', 'medium', 3000, false);
        sessionStorage.removeItem('serviceRequests');
        history.push('/srl');
      } else {
        const errorText = await response.text();
        present({ message: t('csr.toast_failed', { error: errorText || response.status }), duration: 3000, color: 'danger' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      present({ message: t('csr.toast_failed', { error: message }), duration: 3000, color: 'danger' });
    }
  };

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });
      if (image.webPath) {
        setImageUrl(image.webPath);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== 'User cancelled photos app') {
        present({ message: t('csr.toast_camera_error', { error: error.message }), duration: 3000, color: 'danger' });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('csr.page_title')}</IonTitle>
          <IonButtons slot="end"><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="csr-content">
        <div className="csr-layout">
          <div className="csr-title-block">
            <p className="csr-title-main">{t('csr.title')}</p>
            <p className="csr-title-sub">{t('csr.subtitle')}</p>
          </div>
          <div className="csr-textarea-wrapper">
            <textarea
              className="csr-textarea"
              value={problemDescription}
              onChange={e => setProblemDescription(e.target.value)}
              placeholder={t('csr.placeholder')}
            />
            {imageUrl && (
              <div className="csr-thumb-wrapper">
                <img src={imageUrl} alt="selected" className="csr-thumb" />
                <button className="csr-thumb-delete" onClick={() => setImageUrl(null)}>
                  <IonIcon icon={trashOutline} />
                </button>
              </div>
            )}
            <div className="csr-actions">
              <button className="csr-icon-btn" onClick={takePicture}>
                <IonIcon icon={cameraOutline} />
              </button>
              <button
                className={`csr-icon-btn csr-send-btn${!isFormValid ? ' csr-send-disabled' : ''}`}
                onClick={isFormValid ? submit : undefined}
                disabled={!isFormValid}
              >
                <IonIcon icon={sendOutline} />
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateServiceRequest;
