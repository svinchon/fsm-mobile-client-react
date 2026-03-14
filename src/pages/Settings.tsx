import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonSelect, IonSelectOption, IonList, IonListHeader, IonIcon, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonToggle } from '@ionic/react';
import { useState, useEffect, useCallback } from 'react';
import { refresh, ellipse } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './Settings.css';
import { fetchWithTimeout } from '../utils/http';

const languageToCode: Record<string, string> = {
  'English': 'en',
  'French': 'fr',
  'Spanish': 'es',
};

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [fsmDeployedAppName, setFsmDeployedAppName] = useState('');
  const [fsmAppConnectorUrl, setFsmAppConnectorUrl] = useState('');
  const [fsmStatus, setFsmStatus] = useState<'online' | 'offline' | 'checking' | null>(null);
  const [fsmAppConnectorStatus, setfsmAppConnectorStatus] = useState<'online' | 'offline' | 'checking' | null>(null);
  const [rappitUserEmail, setRappitUserEmail] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const [knowledgeAgentUrl, setKnowledgeAgentUrl] = useState('');
  const [kAStatus, setkAStatus] = useState<'online' | 'offline' | 'checking' | null>(null);
  const [appMode, setAppMode] = useState('Customer');
  const [language, setLanguage] = useState('English');
  const [primaryColor, setPrimaryColor] = useState('#1E6EDA');
  const [activeSection, setActiveSection] = useState<'general' | 'ka'>('general');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const fetchUploadedFiles = useCallback(async () => {
    setToastMessage(`Refreshing uploaded files...`);
    setShowToast(true);
    const listUrl = `${knowledgeAgentUrl}/api/list-uploads`;
    try {
      const response = await fetchWithTimeout(listUrl);
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
    const savedFsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');
    const savedFsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const savedRappitUserEmail = localStorage.getItem('rappitUserEmail');
    const savedIsTestMode = localStorage.getItem('isTestMode');
    const savedKnowledgeAgentUrl = localStorage.getItem('knowledgeAgentUrl');
    const savedAppMode = localStorage.getItem('appMode');
    const savedLanguage = localStorage.getItem('language');

    if (savedFsmDeployedAppName) { setFsmDeployedAppName(savedFsmDeployedAppName); } else { setFsmDeployedAppName('fsm-881259960676'); }
    if (savedFsmAppConnectorUrl) { setFsmAppConnectorUrl(savedFsmAppConnectorUrl); } else { setFsmAppConnectorUrl('https://multi-purpose-backend-456003509969.europe-west1.run.app'); }
    if (savedRappitUserEmail) { setRappitUserEmail(savedRappitUserEmail); } else { setRappitUserEmail('xxx@rappit.io'); }
    setIsTestMode(savedIsTestMode === 'true');
    if (savedKnowledgeAgentUrl) { setKnowledgeAgentUrl(savedKnowledgeAgentUrl); } else { setKnowledgeAgentUrl('https://knowledge-agent-456003509969.europe-west1.run.app'); }
    if (savedAppMode) { setAppMode(savedAppMode); } else { setAppMode('Customer'); }
    if (savedLanguage) { setLanguage(savedLanguage); } else { setLanguage('English'); }
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) setPrimaryColor(savedColor);
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
    localStorage.setItem('rappitUserEmail', rappitUserEmail);
    localStorage.setItem('isTestMode', String(isTestMode));
    localStorage.setItem('knowledgeAgentUrl', knowledgeAgentUrl);
    localStorage.setItem('appMode', appMode);
    localStorage.setItem('language', language);
    localStorage.setItem('primaryColor', primaryColor);
    document.documentElement.style.setProperty('--app-primary-color', primaryColor);
    i18n.changeLanguage(languageToCode[language] ?? 'en');
    window.dispatchEvent(new Event('appModeChanged'));
    setToastMessage(t('settings.toast_saved'));
    setShowToast(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCheckKAStatus = async () => {
    if (!knowledgeAgentUrl) {
      setToastMessage(t('settings.toast_enter_ka_url'));
      setShowToast(true);
      return;
    }
    setkAStatus('checking');
    try {
      const response = await fetchWithTimeout(`${knowledgeAgentUrl}`);
      if (response.ok) {
        setkAStatus('online');
        setToastMessage(t('settings.toast_ka_online'));
      } else {
        setkAStatus('offline');
        setToastMessage(t('settings.toast_ka_offline'));
      }
      setShowToast(true);
    } catch (error) {
      console.error('Error checking KA status:', error);
      setkAStatus('offline');
      setToastMessage(t('settings.toast_ka_offline'));
      setShowToast(true);
    }
  };

  const handleCheckfsmAppConnectorStatus = async () => {
    if (!fsmAppConnectorUrl) {
      setToastMessage(t('settings.toast_enter_connector_url'));
      setShowToast(true);
      return;
    }
    setfsmAppConnectorStatus('checking');
    try {
      const response = await fetchWithTimeout(`${fsmAppConnectorUrl}`);
      if (response.ok) {
        setfsmAppConnectorStatus('online');
        setToastMessage(t('settings.toast_fsm_online'));
      } else {
        setfsmAppConnectorStatus('offline');
        setToastMessage(t('settings.toast_fsm_offline'));
      }
      setShowToast(true);
    } catch (error) {
      console.error('Error checking FSM App status:', error);
      setfsmAppConnectorStatus('offline');
      setToastMessage(t('settings.toast_fsm_offline'));
      setShowToast(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setToastMessage(t('settings.toast_select_file'));
      setShowToast(true);
      return;
    }
    const uploadUrl = `${knowledgeAgentUrl}/api/upload`;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      setToastMessage(`Upload in progress`);
      setShowToast(true);
      const response = await fetchWithTimeout(uploadUrl, { method: 'POST', body: formData });
      if (response.ok) {
        setToastMessage(t('settings.toast_upload_ok'));
        setShowToast(true);
        fetchUploadedFiles();
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

  const handleCheckFsmStatus = async () => {
    if (!fsmDeployedAppName) {
      setToastMessage(t('settings.toast_enter_fsm_name'));
      setShowToast(true);
      return;
    }
    setFsmStatus('checking');
    try {
      const response = await fetchWithTimeout(`https://${fsmDeployedAppName}.europe-west1.run.app/actuator/healthz`);
      if (!response.ok) {
        setFsmStatus('offline');
        setToastMessage(t('settings.toast_fsm_offline'));
        setShowToast(true);
        return;
      }
      let isJson = false;
      try {
        await response.clone().json();
        isJson = true;
      } catch {
        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          try { JSON.parse(text.slice(jsonStart, jsonEnd + 1)); isJson = true; } catch { isJson = false; }
        }
      }
      setFsmStatus(isJson ? 'online' : 'offline');
      setToastMessage(isJson ? t('settings.toast_fsm_online') : t('settings.toast_fsm_offline'));
      setShowToast(true);
    } catch (error) {
      console.error('Error checking FSM status:', error);
      setFsmStatus('offline');
      setToastMessage(t('settings.toast_fsm_offline'));
      setShowToast(true);
    }
  };

  const getStatusColor = (status: 'online' | 'offline' | 'checking' | null) => {
    if (status === 'online') return 'success';
    if (status === 'offline') return 'danger';
    if (status === 'checking') return 'warning';
    return 'medium';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('settings.title')}</IonTitle>
          <IonButtons slot="end"><IonMenuButton /></IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={activeSection} onIonChange={(e) => setActiveSection(e.detail.value as 'general' | 'ka')}>
            <IonSegmentButton value="general">{t('settings.section_general')}</IonSegmentButton>
            <IonSegmentButton value="ka">{t('settings.section_ka')}</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        {activeSection === 'general' && (
          <>
            <IonItem>
              <IonLabel position="stacked">{t('settings.fsm_app_name')}</IonLabel>
              <IonInput value={fsmDeployedAppName} onIonInput={(e) => setFsmDeployedAppName(e.detail.value!)} pattern="^[a-z]+-\d+$" inputMode="text" placeholder="Enter FSM Deployed App Name" />
            </IonItem>

            <IonItem>
              <IonLabel>{t('settings.fsm_status')}</IonLabel>
              <IonButton onClick={handleCheckFsmStatus} size="small" slot="end">{t('settings.check_status')}</IonButton>
              <IonIcon icon={ellipse} color={getStatusColor(fsmStatus)} slot="end" style={{ marginRight: '10px' }} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">{t('settings.fsm_connector_url')}</IonLabel>
              <IonInput value={fsmAppConnectorUrl} onIonInput={(e) => setFsmAppConnectorUrl(e.detail.value!)} placeholder="Enter FSM App URL" />
            </IonItem>

            <IonItem>
              <IonLabel>{t('settings.fsm_connector_status')}</IonLabel>
              <IonButton onClick={handleCheckfsmAppConnectorStatus} size="small" slot="end">{t('settings.check_status')}</IonButton>
              <IonIcon icon={ellipse} color={getStatusColor(fsmAppConnectorStatus)} slot="end" style={{ marginRight: '10px' }} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">{t('settings.rappit_user_email')}</IonLabel>
              <IonInput value={rappitUserEmail} onIonInput={(e) => setRappitUserEmail(e.detail.value!)} placeholder="Enter Rappit User Email" />
            </IonItem>

            <IonItem>
              <IonLabel>{t('settings.test_mode')}</IonLabel>
              <IonToggle slot="end" checked={isTestMode} onIonChange={(e) => setIsTestMode(e.detail.checked)} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">{t('settings.language')}</IonLabel>
              <IonSelect value={language} placeholder="Select Language" onIonChange={(e) => setLanguage(e.detail.value)}>
                <IonSelectOption value="English">English</IonSelectOption>
                <IonSelectOption value="French">Français</IonSelectOption>
                <IonSelectOption value="Spanish">Español</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>{t('settings.primary_color')}</IonLabel>
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} slot="end" style={{ width: '48px', height: '32px', border: 'none', cursor: 'pointer' }} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">{t('settings.app_mode')}</IonLabel>
              <IonSelect value={appMode} placeholder="Select App Mode" onIonChange={(e) => setAppMode(e.detail.value)}>
                <IonSelectOption value="Customer">{t('settings.customer')}</IonSelectOption>
                <IonSelectOption value="Technician">{t('settings.technician')}</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
              {t('settings.save')}
            </IonButton>
          </>
        )}

        {activeSection === 'ka' && (
          <>
            <IonItem>
              <IonLabel position="stacked">{t('settings.ka_url')}</IonLabel>
              <IonInput value={knowledgeAgentUrl} onIonInput={(e) => setKnowledgeAgentUrl(e.detail.value!)} placeholder="Enter Knowledge Agent URL" />
            </IonItem>

            <IonItem>
              <IonLabel>{t('settings.ka_status')}</IonLabel>
              <IonButton onClick={handleCheckKAStatus} size="small" slot="end">{t('settings.check_status')}</IonButton>
              <IonIcon icon={ellipse} color={getStatusColor(kAStatus)} slot="end" style={{ marginRight: '10px' }} />
            </IonItem>

            <IonList className="ion-margin-top">
              <IonListHeader>
                <IonLabel>{t('settings.uploaded_docs')}</IonLabel>
                <IonButton onClick={fetchUploadedFiles}>
                  <IonIcon slot="icon-only" icon={refresh} />
                </IonButton>
              </IonListHeader>
              {uploadedFiles.map((file, index) => (
                <IonItem key={index}><IonLabel>{file}</IonLabel></IonItem>
              ))}
            </IonList>

            <IonItem className="ion-margin-top">
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </IonItem>

            <IonButton expand="block" onClick={handleUpload} className="ion-margin-top" disabled={!selectedFile}>
              {t('settings.upload_pdf')}
            </IonButton>
          </>
        )}

        <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastMessage} duration={2000} color="success" position="top" cssClass="narrow-toast" />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
