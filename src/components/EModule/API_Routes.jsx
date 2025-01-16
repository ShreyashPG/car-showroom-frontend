import { BASE_URL } from "../../api";


// Internship Details Routes
export const getAllRecordsInternship = `${BASE_URL}/employee/internship-details/all`;
export const getOneRecordsInternship = (username) => {
  return `${BASE_URL}/employee/internship-details/${username}`;
};
export const addRecordsInternship = `${BASE_URL}/employee/internship-details/create-new`;
export const deleteRecordsInternship = `${BASE_URL}/employee/internship-details/remove`;
export const updateRecordsInternship = `${BASE_URL}/employee/internship-details/update`;
// TODO newly added upload path for internship
export const uploadRecordsInternship = `${BASE_URL}/employee/internship-details/upload-file`;



// Certificate_Courses Routes
export const getAllRecordsCertificateStud = `${BASE_URL}/employee/certificate-courses/all`;
export const getOneRecordsCertificateStud = (username) => {
  return `${BASE_URL}/employee/certificate-courses/${username}`;
};
export const addRecordsCertificateStud = `${BASE_URL}/employee/certificate-courses/create-new`;
export const deleteRecordsCertificateStud = `${BASE_URL}/employee/certificate-courses/remove`;
export const updateRecordsCertificateStud = `${BASE_URL}/employee/certificate-courses/update`;
// TODO newly added upload path for certificate courses
export const uploadRecordsCertificateStud = `${BASE_URL}/employee/certificate-courses/upload-file`;


// Event Participation Routes
export const getAllRecordsParticipation = `${BASE_URL}/employee/event-participation/all`;
export const getOneRecordsParticipation = (username) => {
  return `${BASE_URL}/employee/event-participation/${username}`;
};
export const addRecordsParticipation = `${BASE_URL}/employee/event-participation/create-new`;
export const deleteRecordsParticipation = `${BASE_URL}/employee/event-participation/remove`;
export const updateRecordsParticipation = `${BASE_URL}/employee/event-participation/update`;
// TODO newly added upload path for event participation routes
export const uploadRecordsParticipation = `${BASE_URL}/employee/event-participation/upload-file`;

// Event Organized Route
export const getAllRecordsOrganized = `${BASE_URL}/employee/event-org/all`;
export const getOneRecordsOrganized = (username) => {
  return `${BASE_URL}/employee/event-org/${username}`;
};
export const addRecordsOrganized = `${BASE_URL}/employee/event-org/create-new`;
export const deleteRecordsOrganized = `${BASE_URL}/employee/event-org/remove`;
export const updateRecordsOrganized = `${BASE_URL}/employee/event-org/update`;
// TODO newly added upload path for event organization routes
export const uploadRecordsOrganized = `${BASE_URL}/employee/event-org/upload-file`;


