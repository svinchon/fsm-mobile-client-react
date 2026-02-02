import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonSelect, IonSelectOption, IonList, IonListHeader, IonIcon } from '@ionic/react';
import { useState, useEffect, useCallback } from 'react';
import { refresh, ellipse } from 'ionicons/icons';
import './Settings.css';

const Settings: React.FC = () => {
  const [fsmDeployedAppName, setFsmDeployedAppName] = useState('');
  const [fsmAppConnectorUrl, setFsmAppConnectorUrl] = useState('');
  const [fsmAppStatus, setFsmAppStatus] = useState<'online' | 'offline' | 'checking' | null>(null);
  const [fsmUserEmail, setFsmUserEmail] = useState(''); // New state for FSM User Email
  const [knowledgeAgentUrl, setKnowledgeAgentUrl] = useState('');
  const [appMode, setAppMode] = useState('Customer');
  const [language, setLanguage] = useState('English'); // Default language
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const fetchUploadedFiles = useCallback(async () => {
    setToastMessage(`Refreshing uploaded files...`);
    setShowToast(true);
    const listUrl = `${knowledgeAgentUrl}/api/list-uploads`;
    try {
      const response = await fetch(listUrl);
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data.files);
      } else {
        setToastMessage('Failed to fetch uploaded files.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      setToastMessage('Failed to fetch uploaded files: Network error or server not available.');
      setShowToast(true);
    }
  }, [knowledgeAgentUrl]);

  useEffect(() => {
    // Load settings from localStorage when the component mounts
    const savedFsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');
    const savedFsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const savedFsmUserEmail = localStorage.getItem('fsmUserEmail'); // Load FSM User Email
    const savedKnowledgeAgentUrl = localStorage.getItem('knowledgeAgentUrl');
    const savedAppMode = localStorage.getItem('appMode');
    const savedLanguage = localStorage.getItem('language');

    if (savedFsmDeployedAppName) {
      setFsmDeployedAppName(savedFsmDeployedAppName);
    } else {
      setFsmDeployedAppName('fsm-881259960676');
    }
    if (savedFsmAppConnectorUrl) {
      setFsmAppConnectorUrl(savedFsmAppConnectorUrl);
    } else {
      setFsmAppConnectorUrl('https://multi-purpose-backend-456003509969.europe-west1.run.app');
    }
    if (savedFsmUserEmail) {
      setFsmUserEmail(savedFsmUserEmail);
    } else {
      setFsmUserEmail('xxx@rappit.io');
    }
    if (savedKnowledgeAgentUrl) {
      setKnowledgeAgentUrl(savedKnowledgeAgentUrl);
    } else {
      setKnowledgeAgentUrl('https://knowledge-agent-456003509969.europe-west1.run.app');
    }
    if (savedAppMode) {
      setAppMode(savedAppMode);
    } else {
      setAppMode('Customer');
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('English');
    }
  }, []);

  useEffect(() => {
    if (knowledgeAgentUrl) {
      fetchUploadedFiles();
    }
  }, [knowledgeAgentUrl, fetchUploadedFiles]);

  const handleSave = () => {
    if (fsmDeployedAppName && !/^[a-z]+-\d+$/.test(fsmDeployedAppName)) {
      setToastMessage('FSM Deployed App Name must be lowercase letters, a dash, then a number (e.g., abc-123).');
      setShowToast(true);
      return;
    }
    localStorage.setItem('fsmDeployedAppName', fsmDeployedAppName);
    localStorage.setItem('fsmAppConnectorUrl', fsmAppConnectorUrl);
    localStorage.setItem('fsmUserEmail', fsmUserEmail);
    localStorage.setItem('knowledgeAgentUrl', knowledgeAgentUrl);
    localStorage.setItem('appMode', appMode);
    localStorage.setItem('language', language);
    window.dispatchEvent(new Event('appModeChanged'));
    setToastMessage('Settings saved successfully!');
    setShowToast(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCheckFsmAppStatus = async () => {
    if (!fsmAppConnectorUrl) {
      setToastMessage('Please enter the FSM App Connector URL first.');
      setShowToast(true);
      return;
    }
    setFsmAppStatus('checking');
    try {
      const response = await fetch(`${fsmAppConnectorUrl}/api/checkAppStatus`);
      if (response.ok) {
        setFsmAppStatus('online');
        setToastMessage('FSM App is online.');
        setShowToast(true);
      } else {
        setFsmAppStatus('offline');
        setToastMessage('FSM App is offline.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error checking FSM App status:', error);
      setFsmAppStatus('offline');
      setToastMessage('Failed to check FSM App status: Network error or server not available.');
      setShowToast(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setToastMessage('Please select a file to upload.');
      setShowToast(true);
      return;
    }

    const uploadUrl = `${knowledgeAgentUrl}/api/upload`;
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setToastMessage(`Upload in progress`);
      setShowToast(true);
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setToastMessage('File uploaded successfully!');
        setShowToast(true);
        fetchUploadedFiles(); // Refresh the list of files
      } else {
        const errorData = await response.json();
        setToastMessage(`Upload failed: ${errorData.detail || 'Unknown error'}`);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setToastMessage('Upload failed: Network error or server not available.');
      setShowToast(true);
    }
  };

  const getStatusColor = () => {
    switch (fsmAppStatus) {
      case 'online':
        return 'success'; // Green
      case 'offline':
        return 'danger'; // Red
      case 'checking':
        return 'warning'; // Yellow
      default:
        return 'medium'; // Gray
    }
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
          <IonLabel position="stacked">FSM Deployed App Name</IonLabel>
          <IonInput
            value={fsmDeployedAppName}
            onIonInput={(e) => setFsmDeployedAppName(e.detail.value!)}
            pattern="^[a-z]+-\d+$"
            inputMode="text"
            placeholder="Enter FSM Deployed App Name"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">FSM App Connector URL</IonLabel>
          <IonInput
            value={fsmAppConnectorUrl}
            onIonInput={(e) => setFsmAppConnectorUrl(e.detail.value!)}
            placeholder="Enter FSM App URL"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>FSM App Status</IonLabel>
          <IonButton onClick={handleCheckFsmAppStatus} size="small" slot="end">
            Check Status
          </IonButton>
          <IonIcon icon={ellipse} color={getStatusColor()} slot="end" style={{ marginRight: '10px' }} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">FSM User Email</IonLabel>
          <IonInput
            value={fsmUserEmail}
            onIonInput={(e) => setFsmUserEmail(e.detail.value!)}
            placeholder="Enter FSM User Email"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Knowledge Agent URL</IonLabel>
          <IonInput
            value={knowledgeAgentUrl}
            onIonInput={(e) => setKnowledgeAgentUrl(e.detail.value!)}
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

        <IonItem>
          <IonLabel position="stacked">App Mode</IonLabel>
          <IonSelect
            value={appMode}
            placeholder="Select App Mode"
            onIonChange={(e) => setAppMode(e.detail.value)}
          >
            <IonSelectOption value="Customer">Customer</IonSelectOption>
            <IonSelectOption value="Technician">Technician</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
          Save Settings
        </IonButton>

        <IonList className="ion-margin-top">
          <IonListHeader>
            <IonLabel>Uploaded Documents</IonLabel>
            <IonButton onClick={fetchUploadedFiles}>
              <IonIcon slot="icon-only" icon={refresh}></IonIcon>
            </IonButton>
          </IonListHeader>
          {uploadedFiles.map((file, index) => (
            <IonItem key={index}>
              <IonLabel>{file}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonItem className="ion-margin-top">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </IonItem>

        <IonButton expand="block" onClick={handleUpload} className="ion-margin-top" disabled={!selectedFile}>
          Upload PDF
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
