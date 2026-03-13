// State management
import { useState, useEffect, useCallback } from 'react';

// Sample data
import { ServiceRequest, getServiceRequestsInit } from '../data/service-requests';

// Ionic components
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonToast, IonFab, IonFabButton, IonIcon } from '@ionic/react';

// Ionic icons
import { refresh as refreshIcon } from 'ionicons/icons';

// fetch with timeout method
import { fetchWithTimeout } from '../utils/http';

// display status component
import { useGlobalStatus } from '../state/global-status';


// child component
import ServiceRequestListItem from '../components/ServiceRequestListItem';

// style sheet
import './ServiceRequestsList.css';

// functional component
const ServiceRequestsList: React.FC = () => {

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    const cached = sessionStorage.getItem('serviceRequests');
    return cached ? JSON.parse(cached) : [];
  });

  // gives access to display toast message
  const [present] = useIonToast();

  // gives access to methods allowing to display status
  const { setStatus, clearStatus } = useGlobalStatus();

  // function fetch service request
  // use call back prevents actual call if input didn't change?
  const fetchServiceRequests = useCallback(async () => {

    // get settings from local storage
    const fsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const fsmUserEmail = localStorage.getItem('fsmUserEmail');
    const fsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');

    // diplay message if wrong configuration
    if (!fsmAppConnectorUrl) {
      present({ message: 'FSM App Connector URL is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }
    if (!fsmUserEmail) {
      present({ message: 'FSM User Email is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }
    if (!fsmDeployedAppName) {
      present({ message: 'FSM Deployed App Name is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }

    try {
      let url = `${fsmAppConnectorUrl}/api/getServiceRequests?`;
      url = url + `&deployedAppName=${fsmDeployedAppName}`;
      url = url + `&userEmail=${fsmUserEmail}`;
      // console.log('Fetching service requests from', url);
      // present({ message: 'Fetching service requests...', duration: 3000, color: 'success' });
      setStatus('Fetching service requests...', 'medium', 10000, true);
      const response = await fetchWithTimeout(url);
      if (response.ok) {
        //const data = await response.json();
        const data = await response.json();
        sessionStorage.setItem('serviceRequests', JSON.stringify(data));
        setServiceRequests(data);
        setStatus("Service Requests retrieved");
      } else {
        // present({ message: 'Failed to fetch service requests.', duration: 3000, color: 'danger' });
        setStatus("Failed to fetch Service Requests (not OK)", 'warning', 8000, false);
      }
    } catch (error) {
      // present({ message: 'Failed to fetch service requests: Network error or server not available.', duration: 3000, color: 'danger' });
      setStatus("Failed to fetch Service Requests (Error)", 'warning', 8000, false);
    }
  }, [present]);

  useEffect(() => {
    if (!sessionStorage.getItem('serviceRequests')) {
      setServiceRequests(getServiceRequestsInit());
    }
  }, []);

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
      <IonContent fullscreen className="content-with-status-bar">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList className="list-with-status-bar">
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
