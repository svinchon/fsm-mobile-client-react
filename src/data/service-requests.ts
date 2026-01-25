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
  {
    "createdBy":"user@example.com",
    "createdDate":1768211000000,
    "modifiedBy":"user@example.com",
    "modifiedDate":1768211000000,
    "recDeleted":false,
    "sid":"a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "serviceRequestId":"SER-7",
    "customerCode":"CUST001",
    "country":"US",
    "state":"CA",
    "city":2,
    "issueDescription":"Dishwasher not draining",
    "preferredDate":1766707200000,
    "equipmentPhoto":[],
    "serviceRequestStatus":"PENDING",
    "customerMobileNumber":"9876543210",
    "countryName":"United States",
    "stateName":"California",
    "cityName":"Los Angeles",
    "undocStatus":"IN_PROGRESS",
    "equipmentLabelJson":"{}",
    "task_id":"b1c2d3e4-f5a6-7890-1234-567890abcdef"
  },
  {
    "createdBy":"another@example.com",
    "createdDate":1768211100000,
    "modifiedBy":"another@example.com",
    "modifiedDate":1768211100000,
    "recDeleted":false,
    "sid":"f1e2d3c4-b5a6-7890-1234-567890abcdef",
    "serviceRequestId":"SER-8",
    "customerCode":"CUST002",
    "country":"GB",
    "state":"ENG",
    "city":3,
    "issueDescription":"Washing machine making loud noise",
    "preferredDate":1766793600000,
    "equipmentPhoto":[],
    "serviceRequestStatus":"CLOSED",
    "customerMobileNumber":"0123456789",
    "countryName":"United Kingdom",
    "stateName":"England",
    "cityName":"London",
    "undocStatus":"COMPLETED",
    "equipmentLabelJson":"{}",
    "task_id":"c1d2e3f4-a5b6-7890-1234-567890abcdef"
  }
];

export const getServiceRequests = () => serviceRequests;
// getServiceRequests?userEmail=svinchon@rappit.io`;
export const getServiceRequest = (serviceRequestId: string) => serviceRequests.find(m => m.serviceRequestId === serviceRequestId);
