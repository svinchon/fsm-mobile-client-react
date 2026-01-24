import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonIcon,
  IonTextarea,
  IonButtons,
  IonCard,
  IonCardContent
} from '@ionic/react';
import {
  helpOutline,
  send
} from 'ionicons/icons';
import { useState } from 'react';
import './KnowledgeAgent.css';

const KnowledgeAgent: React.FC = () => {
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleTextArea = () => {
    setIsTextAreaVisible(!isTextAreaVisible);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://0.0.0.0:8000/ask-uploaded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          language: 'French',
        }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar translucent={false} className="no-shadow">
          <IonTitle>Knowledge Agent</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        bla bla
        {response && (
          <IonCard className="response-card">
            <IonCardContent>{response}</IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <IonFooter>
        {isTextAreaVisible && (
          <IonToolbar>
            <IonTextarea
              placeholder="Type your question here..."
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
            <IonButtons slot="end">
              <IonButton onClick={handleSend} disabled={isLoading}>
                <IonIcon icon={send}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        )}
        <IonToolbar className="ion-text-center">
          <IonButton onClick={toggleTextArea}>
            <IonIcon icon={helpOutline} color="light"></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default KnowledgeAgent;
