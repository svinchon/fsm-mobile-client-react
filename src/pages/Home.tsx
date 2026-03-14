import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import rappitLogo from '../svg/rappit.svg';
import './Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle>{t('home.title')}</IonTitle>
		  <IonButtons slot="end">
			<IonMenuButton />
		  </IonButtons>
		</IonToolbar>
	  </IonHeader>
	  <IonContent fullscreen className="home-content">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">{t('home.title')}</IonTitle>
		  </IonToolbar>
		</IonHeader>
		{/* <IonGrid>
		  <IonRow>
			<IonCol className="ion-text-center">
			  <img src={rappitLogo} alt="Rappit" />
			  <h2>{t('home.welcome_message')}</h2>
			  <p>{t('home.customer_page_description')}</p>
			</IonCol>
		  </IonRow>
		</IonGrid> */}
	  </IonContent>
	</IonPage>
  );
};

export default Home;
