import ServiceRequestListItem from '../components/ServiceRequestListItem';
//import TaskBar from '../components/TaskBar';
import { useState } from 'react';
import { ServiceRequest } from '../data/service-requests';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter
} from '@ionic/react';
import './ServiceRequestsList.css';

const ServiceRequestsList: React.FC = () => {

  const [serviceRequests, setserviceRequests] = useState<ServiceRequest[]>([]);
  const [present] = useIonToast();

  useIonViewWillEnter(() => {
    const fetchData = async () => {
      const API_BASE = (import.meta.env as any)?.VITE_API_BASE || 'https://multi-purpose-backend-456003509969.europe-west1.run.app'; //http://localhost:8080';
      const url = `${API_BASE}/getServiceRequests?userEmail=svinchon@rappit.io`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const srs: ServiceRequest[] = await response.json();
        setserviceRequests(srs);
      } catch (e: any) {
        present({ message: `Error fetching service requests: ${e.message}`, duration: 3000, color: 'danger' });
      }
    };
    fetchData();
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Service Requests List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {
            serviceRequests.map(
              srli => (
                <ServiceRequestListItem
                  key={srli.serviceRequestId}
                  serviceRequest={srli}
                />
              )
            )
          }
        </IonList>
      </IonContent>
      {/* <TaskBar /> */}
    </IonPage>
  );
};

export default ServiceRequestsList;
