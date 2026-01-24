export interface ServiceRequest {
  createdBy: string;
  createdDate: number;
  modifiedBy: string;
  modifiedDate: number;
  recDeleted: boolean;
  sid: string;
  serviceRequestId: string;
  customerCode: string;
  country: string;
  state: string;
  city: number;
  issueDescription: string;
  preferredDate: number;
  equipmentPhoto: { id: string; fileName: string }[];
  serviceRequestStatus: string;
  customerMobileNumber: string;
  countryName: string;
  stateName: string;
  cityName: string;
  undocStatus: string;
  equipmentLabelJson: string;
  task_id: string;
}

const serviceRequests: ServiceRequest[] = [
  {
    "createdBy":"svinchon@rappit.io",
    "createdDate":1768210969860,
    "modifiedBy":"nvaisnav@rappit.io",
    "modifiedDate":1768210976973,
    "recDeleted":false,
    "sid":"662d4245-45cf-48d6-b82a-8af00de05b71",
    "serviceRequestId":"SER-6",
    "customerCode":"USR1008",
    "country":"NL",
    "state":"NH",
    "city":1,
    "issueDescription":"Refrigerator KO",
    "preferredDate":1766620800000,
    "equipmentPhoto":[
      {
        "id":"af4806fb-2e19-4e58-8226-9790f20a0e8d",
        "fileName":"Sample_label.png"
      }
    ],
    "serviceRequestStatus":"OPEN",
    "customerMobileNumber":"1234567892",
    "countryName":"Netherland",
    "stateName":"Noord-Holland",
    "cityName":"Amsterdam",
    "undocStatus":"COMPLETED",
    "equipmentLabelJson":"{\"model\": \"AD-COOLPLANT-50T\", \"serialNo\": \"50T-2025-102\", \"dateOfManufacture\": 1727740800}",
    "task_id":"364d5f7c-f985-49a5-bde4-7fae6aaec763"
  },

];

export const getServiceRequests = () => serviceRequests;

export const getServiceRequest = (serviceRequestId: string) => serviceRequests.find(m => m.serviceRequestId === serviceRequestId);

