import ServiceRequestListItem from '../components/ServiceRequestListItem';
//import TaskBar from '../components/TaskBar';
import { useState } from 'react';
// TODO: HERE
import { getServiceRequests, ServiceRequest } from '../data/service-requests';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  // useIonToast,
  // useIonViewWillEnter
} from '@ionic/react';
import './ServiceRequestsList.css';

const ServiceRequestsList: React.FC = () => {

  const [serviceRequests] = useState<ServiceRequest[]>(getServiceRequests());
  // const [present] = useIonToast();

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
