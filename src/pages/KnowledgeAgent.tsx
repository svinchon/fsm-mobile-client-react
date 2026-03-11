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
  send
} from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import './KnowledgeAgent.css';
import { fetchWithTimeout } from '../utils/http';

// display status component
import { useGlobalStatus } from '../state/global-status';

const KnowledgeAgent: React.FC = () => {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState<{text: string, sender: 'user' | 'api'}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ionContentRef = useRef<HTMLIonContentElement>(null);

  // gives access to methods allowing to display status
  const { setStatus, clearStatus } = useGlobalStatus();

  useEffect(() => {
    if (ionContentRef.current) {
      ionContentRef.current.scrollToBottom(300);
    }
  }, [conversation]);


  const handleSend = async () => {
    const currentText = text.trim();
    if (!currentText) return;

    const userMessage = { text: currentText, sender: 'user' as const };
    setConversation(prev => [...prev, userMessage]);
    setText('');
    setIsLoading(true);

    const knowledgeAgentUrl = localStorage.getItem('knowledgeAgentUrl') || 'http://0.0.0.0:8000';
    const selectedLanguage = localStorage.getItem('language') || 'French'; // Default to French if not set

    try {
      setStatus('Processing your question...', 'medium', 10000, true);
      const res = await fetch(knowledgeAgentUrl+"/api/ask-uploaded", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentText,
          language: selectedLanguage,
        }),
      });
      clearStatus();
      const data = await res.json();
      const apiMessage = { text: data.response, sender: 'api' as const };
      setConversation(prev => [...prev, apiMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = { text: 'Error fetching data.', sender: 'api' as const };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Knowledge Agent</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding knowledge-agent-content" ref={ionContentRef}>
        {conversation.map((message, index) => (
          <IonCard key={index} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
            <IonCardContent>{message.text}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTextarea
            rows={5}
            placeholder="Type your question here..."
            className={'message-text-area'}
            value={text}
            /* onIonChange={(e) => setText(e.detail.value!)*/
            onIonInput={(e) => setText(e.detail.value!)}
          ></IonTextarea>
          <IonButtons slot="end">
            <IonButton onClick={handleSend} disabled={isLoading || text.trim() === ''}>
              <IonIcon icon={send}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default KnowledgeAgent;
