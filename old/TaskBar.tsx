import { IonButton, IonButtons, IonFooter, IonIcon, IonToolbar } from '@ionic/react';
import { arrowBackOutline, homeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

type TaskBarProps = {
  showBack?: boolean;
};

const TaskBar: React.FC<TaskBarProps> = ({ showBack = false }) => {
  const history = useHistory();

  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink="/home" routerDirection="root" aria-label="Accueil">
            <IonIcon slot="icon-only" icon={homeOutline}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="primary">
          <IonButton routerLink="/home" routerDirection="root" aria-label="Accueil">
            <IonIcon slot="icon-only" icon={homeOutline}></IonIcon>
          </IonButton>
        </IonButtons>
        {showBack && (
          <IonButtons slot="end">
            <IonButton onClick={() => history.goBack()} aria-label="Retour">
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonFooter>
  );
};

export default TaskBar;
