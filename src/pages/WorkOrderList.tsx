import WorkOrderListItem from '../components/WorkOrderListItem';
import { useState } from 'react';
// TODO: HERE
import { getWorkOrders, WorkOrder } from '../data/work-orders';
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
import './WorkOrderList.css';

const WorkOrderList: React.FC = () => {

  //const [workOrders] = useState<WorkOrder[]>(WORK_ORDERS);
  const [workOrders] = useState<WorkOrder[]>(getWorkOrders());
  // const [present] = useIonToast();

  // useIonViewWillEnter(() => {
  //   const fetchData = async () => {
  //     const API_BASE = (import.meta.env as { VITE_API_BASE?: string })?.VITE_API_BASE || 'https://multi-purpose-backend-456003509969.europe-west1.run.app';
  //     const url = `${API_BASE}/getWorkOrders?userEmail=svinchon@rappit.io`;
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const wos: WorkOrder[] = await response.json();
  //       setWorkOrders(wos);
  //     } catch (e: unknown) {
  //       if (e instanceof Error) {
  //         present({ message: `Error fetching work orders: ${e.message}`, duration: 3000, color: 'danger' });
  //       } else {
  //         present({ message: `An unknown error occurred`, duration: 3000, color: 'danger' });
  //       }
  //     }
  //   };
  //   fetchData();
  // });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Work Order List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Work Orders
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {
            workOrders.map(
              woli => (
                <WorkOrderListItem
                  key={woli.workOrderId}
                  workOrder={woli}
                />
              )
            )
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WorkOrderList;
