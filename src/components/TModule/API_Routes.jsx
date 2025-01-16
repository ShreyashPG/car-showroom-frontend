import { BASE_URL } from "../../api";



// Grants Routes
export const getAllRecordsGrants = `${BASE_URL}/teacher/grants/all`;
export const getOneRecordsGrants = (username) => {
  return `${BASE_URL}/teacher/grants/${username}`;
};
export const addRecordsGrants = `${BASE_URL}/teacher/grants/create-new`;
export const deleteRecordsGrants = `${BASE_URL}/teacher/grants/remove`;
export const updateRecordsGrants = `${BASE_URL}/teacher/grants/update`;
export const uploadRecordsGrants = `${BASE_URL}/teacher/grants/upload-file`;

//Consultancy Report
export const getAllRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/all`;
export const getOneRecordsConsultancy = (username) => {
  return `${BASE_URL}/teacher/cons-rep/${username}`;
};
export const addRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/create-new`;
export const deleteRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/remove`;
export const updateRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/update`;
export const uploadRecordsConsultancy = `${BASE_URL}/teacher/cons-rep/upload-file`;

// SSTP_FDP_Workshop Attended Routes
export const getAllRecordsAttended = `${BASE_URL}/teacher/sf-ws/all`;
export const getOneRecordsAttended = (username) => {
  return `${BASE_URL}/teacher/sf-ws/${username}`;
};
export const addRecordsAttended = `${BASE_URL}/teacher/sf-ws/create-new`;
export const deleteRecordsAttended = `${BASE_URL}/teacher/sf-ws/remove`;
export const updateRecordsAttended = `${BASE_URL}/teacher/sf-ws/update`;
export const uploadRecordsAttended = `${BASE_URL}/teacher/sf-ws/upload-file`;


// Industrial_Visits Routes
export const getAllRecordsIndustrial = `${BASE_URL}/teacher/visit-tours/all`;
export const getOneRecordsIndustrial = (username) => {
  return `${BASE_URL}/teacher/visit-tours/${username}`;
};
export const addRecordsIndustrial = `${BASE_URL}/teacher/visit-tours/create-new`;
export const deleteRecordsIndustrial = `${BASE_URL}/teacher/visit-tours/remove`;
export const updateRecordsIndustrial = `${BASE_URL}/teacher/visit-tours/update`;
export const uploadRecordsIndustrial = `${BASE_URL}/teacher/visit-tours/upload-file`;

