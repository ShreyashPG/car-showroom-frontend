import { BASE_URL } from "../../api";



// MonthlySales Routes
export const getAllRecordsMonthlySales = `${BASE_URL}/sale/monthlySales/all`;
export const getOneRecordsMonthlySales = (username) => {
  return `${BASE_URL}/sale/monthlySales/${username}`;
};
export const addRecordsMonthlySales = `${BASE_URL}/sale/monthlySales/create-new`;
export const deleteRecordsMonthlySales = `${BASE_URL}/sale/monthlySales/remove`;
export const updateRecordsMonthlySales = `${BASE_URL}/sale/monthlySales/update`;
export const uploadRecordsMonthlySales = `${BASE_URL}/sale/monthlySales/upload-file`;

//Stock Report
export const getAllRecordsStock = `${BASE_URL}/sale/stock-report/all`;
export const getOneRecordsStock = (username) => {
  return `${BASE_URL}/sale/stock-report/${username}`;
};
export const addRecordsStock = `${BASE_URL}/sale/stock-report/create-new`;
export const deleteRecordsStock = `${BASE_URL}/sale/stock-report/remove`;
export const updateRecordsStock = `${BASE_URL}/sale/stock-report/update`;
export const uploadRecordsStock = `${BASE_URL}/sale/stock-report/upload-file`;

// Profit_Loss_Report ProfitLoss Routes
export const getAllRecordsProfitLoss = `${BASE_URL}/sale/profit-loss/all`;
export const getOneRecordsProfitLoss = (username) => {
  return `${BASE_URL}/sale/profit-loss/${username}`;
};
export const addRecordsProfitLoss = `${BASE_URL}/sale/profit-loss/create-new`;
export const deleteRecordsProfitLoss = `${BASE_URL}/sale/profit-loss/remove`;
export const updateRecordsProfitLoss = `${BASE_URL}/sale/profit-loss/update`;
export const uploadRecordsProfitLoss = `${BASE_URL}/sale/profit-loss/upload-file`;


// Lead_Conversions Routes
export const getAllRecordsLeadConversions = `${BASE_URL}/sale/lead-conversions/all`;
export const getOneRecordsLeadConversions = (username) => {
  return `${BASE_URL}/sale/lead-conversions/${username}`;
};
export const addRecordsLeadConversions = `${BASE_URL}/sale/lead-conversions/create-new`;
export const deleteRecordsLeadConversions = `${BASE_URL}/sale/lead-conversions/remove`;
export const updateRecordsLeadConversions = `${BASE_URL}/sale/lead-conversions/update`;
export const uploadRecordsLeadConversions = `${BASE_URL}/sale/lead-conversions/upload-file`;

