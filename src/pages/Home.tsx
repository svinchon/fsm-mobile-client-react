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
import './Home.css';

const Home: React.FC = () => {
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle>Home</IonTitle>
		</IonToolbar>
	  </IonHeader>
	  <IonContent fullscreen className="home-content">
		<IonHeader collapse="condense">
		  <IonToolbar>
			<IonTitle size="large">Home</IonTitle>
		  </IonToolbar>
		</IonHeader>
		<IonGrid>
		  <IonRow>
			<IonCol className="ion-text-center">
			  <h2>Welcome to the Sample FSM Mobile App!</h2>
			  <p>This is the home page for customers.</p>
			</IonCol>
		  </IonRow>
		</IonGrid>
	  </IonContent>
	</IonPage>
  );
};

export default Home;
