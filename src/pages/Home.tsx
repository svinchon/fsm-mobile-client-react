import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle>Home</IonTitle>
		  <IonTitle>{t('home.title')}</IonTitle>
		</IonToolbar>
	  </IonHeader>
	  <IonContent fullscreen className="home-content">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">Home</IonTitle>
			<IonTitle size="large">{t('home.title')}</IonTitle>
		  </IonToolbar>
		</IonHeader>
		<IonGrid>
		  <IonRow>
			<IonCol className="ion-text-center">
			  <h2>Welcome to the Sample FSM Mobile App!</h2>
			  <p>This is the home page for customers.</p>
			  <h2>{t('home.welcome_message')}</h2>
			  <p>{t('home.customer_page_description')}</p>
			</IonCol>
		  </IonRow>
		</IonGrid>
	  </IonContent>
	</IonPage>
  );
};

export default Home;
