import { IonText, IonToolbar } from '@ionic/react';
import { useGlobalStatus } from '../state/global-status';
import './GlobalStatusBar.css';

const GlobalStatusBar: React.FC = () => {
  const { status } = useGlobalStatus();

  return (
    <IonToolbar color={status.tone} className="global-status-bar">
      <div className="global-status-bar__content">
        <IonText>
          {status.message || ' '}
          {status.message && status.showCountdown ? ` (${status.elapsedSeconds}s)` : ''}
        </IonText>
      </div>
    </IonToolbar>
  );
};

export default GlobalStatusBar;
