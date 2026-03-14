import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonMenuButton, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Account: React.FC = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(localStorage.getItem('userFirstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('userLastName') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');

  const handleSave = () => {
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userEmail', email);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('account.title')}</IonTitle>
          <IonButtons slot="end"><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">{t('account.first_name')}</IonLabel>
          <IonInput value={firstName} onIonInput={(e) => setFirstName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">{t('account.last_name')}</IonLabel>
          <IonInput value={lastName} onIonInput={(e) => setLastName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">{t('account.email')}</IonLabel>
          <IonInput type="email" value={email} onIonInput={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" style={{ margin: '24px 0 0 0' }} onClick={handleSave}>
          {t('account.save')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Account;
