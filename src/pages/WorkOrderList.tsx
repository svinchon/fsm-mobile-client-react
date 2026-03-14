import WorkOrderListItem from '../components/WorkOrderListItem';
import { useState, useEffect, useCallback} from 'react';
import { getWorkOrdersInit, WorkOrder } from '../data/work-orders';
import { IonContent, IonHeader, IonPage, IonRefresher,
  IonRefresherContent, IonTitle, IonToolbar, useIonToast,
  IonButtons, IonMenuButton
} from '@ionic/react';
import './WorkOrderList.css';
import { fetchWithTimeout } from '../utils/http';
import { useGlobalStatus } from '../state/global-status';

const WorkOrderList: React.FC = () => {

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const cached = sessionStorage.getItem('workOrders');
    return cached ? JSON.parse(cached) : [];
  });
  const [present] = useIonToast();
    const { setStatus, clearStatus } = useGlobalStatus();

  const fetchWorkOrders = useCallback(async () => {

    const fsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl');
    const rappitUserEmail = localStorage.getItem('rappitUserEmail');
    const fsmDeployedAppName = localStorage.getItem('fsmDeployedAppName');
    const isTestMode = localStorage.getItem('isTestMode') === 'true';

    if (!fsmAppConnectorUrl) {
      present({ message: 'FSM App Connector URL is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }
    if (!rappitUserEmail) {
      present({ message: 'Rappit User Email is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }
    if (!fsmDeployedAppName) {
      present({ message: 'FSM Deployed App Name is not configured in settings.', duration: 3000, color: 'danger' });
      return;
    }

    try {
      let url = `${fsmAppConnectorUrl}/api/getWorkOrders?`;
      url = url + `&deployedAppName=${fsmDeployedAppName}`;
      url = url + `&rappitUserEmail=${rappitUserEmail}`;
      url = url + `&isTestMode=${isTestMode}`;
      //console.log('Fetching work orders from', url);
      setStatus('Fetching work orders...', 'medium', 10000, true);
      const response = await fetchWithTimeout(url);
      // present({ message: 'Fetching work orders...', duration: 3000, color: 'success' });
      if (response.ok) {
        setStatus('Work orders retrieved.');
        const data = await response.json();
        sessionStorage.setItem('workOrders', JSON.stringify(data));
        setWorkOrders(data);
        //console.log('Fetched work orders:', data);
      } else {
        // present({ message: 'Failed to fetch work orders.', duration: 3000, color: 'danger' });
        setStatus("Failed to fetch Work Orders (not OK)", 'warning', 8000, false);

      }
    } catch (error) {
      //console.error('Error fetching work orders:', error);
      present({ message: 'Failed to fetch work orders: Network error or server not available.', duration: 3000, color: 'danger' });
    }
  }, [present]);

  useEffect(() => {
    if (!sessionStorage.getItem('workOrders')) {
      setWorkOrders(getWorkOrdersInit());
    }
  }, []);

  const handleRefresh = (e: CustomEvent) => {
    fetchWorkOrders().then(() => e.detail.complete());
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Work Orders</IonTitle>
          <IonButtons slot="end"><IonMenuButton /></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="content-with-status-bar">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="list-with-status-bar">
          {workOrders.map(woli => (
            <WorkOrderListItem key={woli.workOrderId} workOrder={woli} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WorkOrderList;
