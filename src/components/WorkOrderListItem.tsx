import {
  IonItem,
  IonLabel,
  } from '@ionic/react';
import { WorkOrder } from '../data/work-orders';
import './WorkOrderListItem.css';

interface WorkOrderListItemProps {
  workOrder: WorkOrder;
}

const WorkOrderListItem: React.FC<WorkOrderListItemProps> =
({ workOrder }) => {
  return (
    <IonItem id="work-order-list-item">
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {workOrder.workOrderId}
        </h2>
        <p>
          {workOrder.assignedTechnician}
        </p>
        <p>
          {workOrder.workorderStatus}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default WorkOrderListItem;
