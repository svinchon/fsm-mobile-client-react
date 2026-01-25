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
import { useState, useEffect, useRef } from 'react';
import './KnowledgeAgent.css';

const KnowledgeAgent: React.FC = () => {
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState<{text: string, sender: 'user' | 'api'}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ionContentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    if (ionContentRef.current) {
      ionContentRef.current.scrollToBottom(300);
    }
  }, [conversation]);

  const toggleTextArea = () => {
    setIsTextAreaVisible(!isTextAreaVisible);
  };

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
      const res = await fetch(knowledgeAgentUrl+"/ask-uploaded", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentText,
          language: selectedLanguage,
        }),
      });
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
      <IonContent className="ion-padding" ref={ionContentRef}>
        {conversation.map((message, index) => (
          <IonCard key={index} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
            <IonCardContent>{message.text}</IonCardContent>
          </IonCard>
        ))}
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
              <IonButton onClick={handleSend} disabled={isLoading || text.trim() === ''}>
                <IonIcon icon={send}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        )}
        <IonToolbar className="ion-text-center">
          <IonButton onClick={toggleTextArea}>
            Ask Knowledge Agent
            {/* <IonIcon icon={helpOutline} color="light"></IonIcon> */}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default KnowledgeAgent;
