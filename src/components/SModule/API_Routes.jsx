import { BASE_URL } from "../../api";



// Grants Routes
export const getAllRecordsGrants = `${BASE_URL}/sale/grants/all`;
export const getOneRecordsGrants = (username) => {
  return `${BASE_URL}/sale/grants/${username}`;
};
export const addRecordsGrants = `${BASE_URL}/sale/grants/create-new`;
export const deleteRecordsGrants = `${BASE_URL}/sale/grants/remove`;
export const updateRecordsGrants = `${BASE_URL}/sale/grants/update`;
export const uploadRecordsGrants = `${BASE_URL}/sale/grants/upload-file`;

//Consultancy Report
export const getAllRecordsConsultancy = `${BASE_URL}/sale/cons-rep/all`;
export const getOneRecordsConsultancy = (username) => {
  return `${BASE_URL}/sale/cons-rep/${username}`;
};
export const addRecordsConsultancy = `${BASE_URL}/sale/cons-rep/create-new`;
export const deleteRecordsConsultancy = `${BASE_URL}/sale/cons-rep/remove`;
export const updateRecordsConsultancy = `${BASE_URL}/sale/cons-rep/update`;
export const uploadRecordsConsultancy = `${BASE_URL}/sale/cons-rep/upload-file`;

// SSTP_FDP_Workshop Attended Routes
export const getAllRecordsAttended = `${BASE_URL}/sale/sf-ws/all`;
export const getOneRecordsAttended = (username) => {
  return `${BASE_URL}/sale/sf-ws/${username}`;
};
export const addRecordsAttended = `${BASE_URL}/sale/sf-ws/create-new`;
export const deleteRecordsAttended = `${BASE_URL}/sale/sf-ws/remove`;
export const updateRecordsAttended = `${BASE_URL}/sale/sf-ws/update`;
export const uploadRecordsAttended = `${BASE_URL}/sale/sf-ws/upload-file`;


// Industrial_Visits Routes
export const getAllRecordsIndustrial = `${BASE_URL}/sale/visit-tours/all`;
export const getOneRecordsIndustrial = (username) => {
  return `${BASE_URL}/sale/visit-tours/${username}`;
};
export const addRecordsIndustrial = `${BASE_URL}/sale/visit-tours/create-new`;
export const deleteRecordsIndustrial = `${BASE_URL}/sale/visit-tours/remove`;
export const updateRecordsIndustrial = `${BASE_URL}/sale/visit-tours/update`;
export const uploadRecordsIndustrial = `${BASE_URL}/sale/visit-tours/upload-file`;

