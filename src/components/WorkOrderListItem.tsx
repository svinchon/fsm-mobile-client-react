import { IonCard, IonCardContent, IonBadge } from '@ionic/react';
import { WorkOrder } from '../data/work-orders';
import './WorkOrderListItem.css';

interface WorkOrderListItemProps {
  workOrder: WorkOrder;
}

const statusColor = (status: string): string => {
  switch (status) {
    case 'COMPLETED': return 'success';
    case 'ASSIGNED': return 'primary';
    case 'PENDING': return 'warning';
    case 'CANCELLED': return 'medium';
    default: return 'dark';
  }
};

const priorityColor = (priority: string): string => {
  switch (priority) {
    case 'HIGH': return 'danger';
    case 'MEDIUM': return 'warning';
    case 'LOW': return 'medium';
    default: return 'dark';
  }
};

const WorkOrderListItem: React.FC<WorkOrderListItemProps> = ({ workOrder }) => {
  return (
    <IonCard className="wo-card">
      <IonCardContent>
        <div className="wo-header">
          <span className="wo-id">{workOrder.workOrderId}</span>
          <div className="wo-badges">
            <IonBadge color={priorityColor(workOrder.priorityLevel)} style={{ marginRight: '6px' }}>
              {workOrder.priorityLevel}
            </IonBadge>
            <IonBadge color={statusColor(workOrder.workorderStatus)}>
              {workOrder.workorderStatus}
            </IonBadge>
          </div>
        </div>
        {workOrder.serviceRequestId && (
          <p className="wo-sr-ref">SR: {workOrder.serviceRequestId}</p>
        )}
        <p className="wo-description">{workOrder.technicianSkills}</p>
        {workOrder.assignedTechnician && (
          <p className="wo-technician">{workOrder.technicianMail}</p>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default WorkOrderListItem;
