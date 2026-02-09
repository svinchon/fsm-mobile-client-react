export interface WorkOrder {
  createdBy: string;
  createdDate: number;
  modifiedBy: string;
  modifiedDate: number;
  recDeleted: boolean
  sid: string;
  workOrderId: string;
  serviceRequestId: string;
  technicianSkills: string;
  priorityLevel: string;
  warrantyStatus: string;
  assignedTechnician: string;
  workorderStatus: string;
  technicianMail: string;
  requestCompletionTime: string;
}

const WorkOrders: WorkOrder[] = [
  {
    "createdBy": "mvharlingen@rappit.io",
    "createdDate": 1768209998118,
    "modifiedBy": "svinchon@rappit.io",
    "modifiedDate": 1768210026009,
    "recDeleted": false,
    "sid": "4ba0a37d-6ec4-4712-ab78-527848643556",
    "workOrderId": "WO-1",
    "serviceRequestId": "SER-3",
    "technicianSkills": "Motor Specialist",
    "priorityLevel": "LOW",
    "warrantyStatus": "UNDER_WARRANTY",
    "assignedTechnician": "USR1006",
    "workorderStatus": "COMPLETED",
    "technicianMail": "tsivaramakrishnan@rappit.io",
    "requestCompletionTime": "2"
  },
  /*{
    "createdBy": "mvharlingen@rappit.io",
    "createdDate": 1768215930913,
    "modifiedBy": "mvharlingen@rappit.io",
    "modifiedDate": 1768215947617,
    "recDeleted": false,
    "sid": "46637d91-f719-4b05-b969-e76c249daadf",
    "workOrderId": "WO-2",
    "serviceRequestId": "SER-7",
    "technicianSkills": "Motor Specialist",
    "priorityLevel": "LOW",
    "warrantyStatus": "UNDER_WARRANTY",
    "assignedTechnician": "USR1006",
    "workorderStatus": "ASSIGNED",
    "technicianMail": "tsivaramakrishnan@rappit.io",
    "requestCompletionTime": "2"
  }*/
];

export const getWorkOrdersInit = () => WorkOrders;

//export const getWorkOrder = (serviceRequestId: string) => serviceRequests.find(m => m.serviceRequestId === serviceRequestId);
