import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
  const [fsmAppConnectorUrl, setFsmAppConnectorUrl] = useState('');
  const [knowledgeAgentUrl, setKnowledgeAgentUrl] = useState('');
  const [language, setLanguage] = useState('English'); // Default language
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Load settings from localStorage when the component mounts
    const savedFsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const savedKnowledgeAgentUrl = localStorage.getItem('knowledgeAgentUrl');
    const savedLanguage = localStorage.getItem('language');

    if (savedFsmAppConnectorUrl) {
      setFsmAppConnectorUrl(savedFsmAppConnectorUrl);
    }
    if (savedKnowledgeAgentUrl) {
      setKnowledgeAgentUrl(savedKnowledgeAgentUrl);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('fsmAppConnectorUrl', fsmAppConnectorUrl);
    localStorage.setItem('knowledgeAgentUrl', knowledgeAgentUrl);
    localStorage.setItem('language', language);
    setToastMessage('Settings saved successfully!');
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">FSM App Connector URL</IonLabel>
          <IonInput
            value={fsmAppConnectorUrl}
            onIonChange={(e) => setFsmAppConnectorUrl(e.detail.value!)}
            placeholder="Enter FSM App URL"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Knowledge Agent URL</IonLabel>
          <IonInput
            value={knowledgeAgentUrl}
            onIonChange={(e) => setKnowledgeAgentUrl(e.detail.value!)}
            placeholder="Enter Knowledge Agent URL"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Language</IonLabel>
          <IonSelect
            value={language}
            placeholder="Select Language"
            onIonChange={(e) => setLanguage(e.detail.value)}
          >
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="French">French</IonSelectOption>
            <IonSelectOption value="Spanish">Spanish</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
          Save Settings
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
