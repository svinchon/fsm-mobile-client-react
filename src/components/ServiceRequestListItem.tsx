import {
  IonItem,
  IonLabel,
  } from '@ionic/react';
import { ServiceRequest } from '../data/service-requests';
import './ServiceRequestListItem.css';

interface ServiceRequestListItemProps {
  serviceRequest: ServiceRequest;
}

const ServiceRequestListItem: React.FC<ServiceRequestListItemProps> =
({ serviceRequest }) => {
  return (
    <IonItem id="service-request-list-item">
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {serviceRequest.serviceRequestId}
        </h2>
        <p>
          (for {serviceRequest.customerCode})
        </p>
        <p>
          {serviceRequest.issueDescription}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ServiceRequestListItem;
