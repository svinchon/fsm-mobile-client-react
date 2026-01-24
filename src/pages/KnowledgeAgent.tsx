import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButtons,
  IonButton,
  IonIcon,
  IonNote,
  useIonToast,
  IonImg
} from '@ionic/react';
import {
  library,
  list,
  addCircle,
  helpOutline
} from 'ionicons/icons';

import { useState } from 'react';

const KnowledgeAgent: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Knowledge Agent</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        bla bla
        <IonTextarea placeholder="Type your question here..." rows={6} cols={20}></IonTextarea>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            <IonButton>Start</IonButton>
          </IonTitle>
          {/* <IonButtons slot="start">
            <IonButton>
              <IonIcon slot="start" icon={helpOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="end" icon={library}></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default KnowledgeAgent;
