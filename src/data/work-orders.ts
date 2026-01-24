export interface WorkOrder {
  workOrderId: string;
  subject: string;
  description: string;
  date: string;
}

const WorkOrders: WorkOrder[] = [
  {
    workOrderId: 'WO-001',
    subject: 'Fix leaky faucet',
    description: 'The faucet in the kitchen is constantly dripping.',
    date: '2024-01-20',
  },
  {
    workOrderId: 'WO-002',
    subject: 'Repair broken window',
    description: 'A window in the living room is cracked and needs replacement.',
    date: '2024-01-21',
  },
  {
    workOrderId: 'WO-003',
    subject: 'Install new light fixture',
    description: 'Replace the old light fixture in the hallway with a new one.',
    date: '2024-01-22',
  },
  {
    workOrderId: 'WO-004',
    subject: 'Check HVAC system',
    description: 'The heating system is making strange noises.',
    date: '2024-01-23',
  },
  {
    workOrderId: 'WO-005',
    subject: 'Paint bedroom walls',
    description: 'Repaint the bedroom walls with a fresh coat of white paint.',
    date: '2024-01-24',
  },
];

export const getWorkOrders = () => WorkOrders;

//export const getWorkOrder = (serviceRequestId: string) => serviceRequests.find(m => m.serviceRequestId === serviceRequestId);
