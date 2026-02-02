import ServiceRequestListItem from '../components/ServiceRequestListItem';
import { useState, useEffect, useCallback } from 'react';
import { ServiceRequest, getServiceRequestsInit } from '../data/service-requests';
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
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { refresh as refreshIcon } from 'ionicons/icons';
import './ServiceRequestsList.css';

const ServiceRequestsList: React.FC = () => {

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [present] = useIonToast();

  const fetchServiceRequests = useCallback(async () => {
    const fsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const fsmUserEmail = localStorage.getItem('fsmUserEmail');
    const fsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');

    if (!fsmAppConnectorUrl) {
      present({
        message: 'FSM App Connector URL is not configured in settings.',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

    if (!fsmUserEmail) {
      present({
        message: 'FSM User Email is not configured in settings.',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

    if (!fsmDeployedAppName) {
      present({
        message: 'FSM Deployed App Name is not configured in settings.',
        duration: 3000,
        color: 'danger'
      });
      return;
    }

    try {
      let url = `${fsmAppConnectorUrl}/api/getServiceRequests?`;
      url = url + `&deployedAppName=${fsmDeployedAppName}`;
      url = url + `&userEmail=${fsmUserEmail}`;
      console.log('Fetching service requests from', url);
      present({
        message: 'Fetching service requests...',
        duration: 3000,
        color: 'success'
      });
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched service requests:', data);
        setServiceRequests(data);
      } else {
        present({
          message: 'Failed to fetch service requests.',
          duration: 3000,
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
      present({
        message: 'Failed to fetch service requests: Network error or server not available.',
        duration: 3000,
        color: 'danger'
      });
    }
  }, [present]);

  useEffect(() => {
    setServiceRequests(getServiceRequestsInit());
    //fetchServiceRequests();
  }, [fetchServiceRequests]);

  const handleRefresh = (e: CustomEvent) => {
    fetchServiceRequests().then(() => e.detail.complete());
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Service Requests List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => fetchServiceRequests()}>
            <IonIcon icon={refreshIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ServiceRequestsList;
