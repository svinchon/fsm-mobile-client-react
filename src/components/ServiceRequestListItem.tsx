import { IonCard, IonCardContent, IonBadge } from '@ionic/react';
import { useEffect, useState } from 'react';
import { ServiceRequest } from '../data/service-requests';
import './ServiceRequestListItem.css';

interface ServiceRequestListItemProps {
  serviceRequest: ServiceRequest;
}

const statusColor = (status: string): string => {
  switch (status) {
    case 'OPEN': return 'success';
    case 'PENDING': return 'warning';
    case 'CLOSED': return 'medium';
    case 'IN_PROGRESS': return 'primary';
    default: return 'dark';
  }
};

const AttachmentImage: React.FC<{ id: string; fileName: string }> = ({ id, fileName }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const fsmAppConnectorUrl = localStorage.getItem('fsmAppConnectorUrl') || '';
    const fsmDeployedAppName = localStorage.getItem('fsmDeployedAppName') || '';
    const rappitUserEmail = localStorage.getItem('rappitUserEmail') || '';
    const isTestMode = localStorage.getItem('isTestMode') === 'true';
    if (!fsmAppConnectorUrl || !fsmDeployedAppName || !rappitUserEmail) return;

    const url = `${fsmAppConnectorUrl}/api/getAttachment?attachmentId=${id}&deployedAppName=${fsmDeployedAppName}&rappitUserEmail=${encodeURIComponent(rappitUserEmail)}&isTestMode=${isTestMode}`;
    let objectUrl: string;

    console.log('[AttachmentImage] fetching:', url);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then(blob => {
        console.log('[AttachmentImage] blob received:', blob.type, blob.size, 'bytes');
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch((err) => {
        console.error('[AttachmentImage] fetch failed for id', id, ':', err);
        setSrc(null);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [id]);

  if (!src) return null;

  return (
    <div className="sr-photo-row">
      <img src={src} alt={fileName} className="sr-thumbnail" />
      <span className="sr-photo-name">{fileName}</span>
    </div>
  );
};

const ServiceRequestListItem: React.FC<ServiceRequestListItemProps> = ({ serviceRequest }) => {
  return (
    <IonCard className="sr-card">
      <IonCardContent>
        <div className="sr-header">
          <span className="sr-id">{serviceRequest.serviceRequestId}</span>
          <IonBadge color={statusColor(serviceRequest.serviceRequestStatus)}>
            {serviceRequest.serviceRequestStatus}
          </IonBadge>
        </div>
        <p className="sr-description">{serviceRequest.issueDescription}</p>
        {serviceRequest.equipmentPhoto.length > 0 && (
          <>
            <hr className="sr-divider" />
            <div className="sr-photos">
              {serviceRequest.equipmentPhoto.map((photo) => (
                <AttachmentImage key={photo.id} id={photo.id} fileName={photo.fileName} />
              ))}
            </div>
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default ServiceRequestListItem;
