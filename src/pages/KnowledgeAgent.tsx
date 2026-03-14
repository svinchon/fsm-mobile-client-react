import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonTextarea,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { sendOutline, attachOutline, trashOutline } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import './KnowledgeAgent.css';
import { useTranslation } from 'react-i18next';
import { useGlobalStatus } from '../state/global-status';
import rappitLogo from '../svg/rappit.svg';

const KnowledgeAgent: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState<{text: string, sender: 'user' | 'api'}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setStatus, clearStatus } = useGlobalStatus();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
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
    const selectedLanguage = localStorage.getItem('language') || 'French';

    try {
      setStatus('Processing your question...', 'medium', 10000, true);
      const res = await fetch(knowledgeAgentUrl + '/api/ask-uploaded', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentText, language: selectedLanguage }),
      });
      clearStatus();
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setConversation(prev => [...prev, { text: data.response, sender: 'api' as const }]);
    } catch (error) {
      clearStatus();
      console.error('Error fetching data:', error);
      setConversation(prev => [...prev, { text: 'Error fetching data.', sender: 'api' as const }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('knowledge-agent.title')}</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div className="ka-layout">

          <div className="ka-top knowledge-agent-content" ref={conversationRef}>
            {conversation.length === 0 ? (
              <div className="ka-welcome">
                <img src={rappitLogo} alt="Rappit" style={{ width: '120px' }} />
                <h2>{t('knowledge-agent.welcome_message')}</h2>
              </div>
            ) : (
              conversation.map((message, index) => (
                <IonCard key={index} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
                  <IonCardContent>{message.text}</IonCardContent>
                </IonCard>
              ))
            )}
          </div>

          <div className="ka-bottom">
            <div className="ka-input-box">
              <IonTextarea
                rows={4}
                placeholder="Type your question here..."
                value={text}
                onIonInput={(e) => setText(e.detail.value!)}
                style={{ '--padding-start': '4px' }}
              />
              {imageUrl && (
                <div className="ka-thumb-wrapper">
                  <img src={imageUrl} alt="selected" className="ka-thumb" />
                  <button className="ka-thumb-delete" onClick={() => setImageUrl(null)}>
                    <IonIcon icon={trashOutline} />
                  </button>
                </div>
              )}
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              <div className="ka-input-actions">
                <button className="ka-icon-btn" onClick={() => fileInputRef.current?.click()}>
                  <IonIcon icon={attachOutline} style={{ fontSize: '2.1rem', transform: 'rotate(45deg)', display: 'block' }} />
                </button>
                <button
                  className={`ka-icon-btn ka-send-btn${isLoading || text.trim() === '' ? ' ka-send-disabled' : ''}`}
                  onClick={handleSend}
                  disabled={isLoading || text.trim() === ''}
                >
                  <IonIcon icon={sendOutline} style={{ fontSize: '1.7rem', transform: 'rotate(-45deg) translate(4px, -2px)', display: 'block' }} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default KnowledgeAgent;
