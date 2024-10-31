import backendApi from "./backendApi";

const EmployeeAssignmentsService = {
    uploadCsv: async (csvFileFormData) => {
        return await backendApi.post('/employees-assignments', csvFileFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            return response;
          });
    },
};


export default EmployeeAssignmentsService;