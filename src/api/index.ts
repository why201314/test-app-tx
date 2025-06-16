import {get, get_pdf, post, deletes, getBaseURL} from './request';



const HttpManager = {
// API of contact 
 getAllContact: () => get(`contact`),

 deleteContact: (id : number) => deletes(`contact/delete?id=${id}`),

 addContact: (params:{}) => post(`contact/add`, params),

 updateContact: (params:{}) => post(`contact/update`, params),

 searchContact: (query: string) => get(`contact/search?query=${query}`),

 generateContactPdf: () => get_pdf('contact/pdfOfContact'),

 addEmployee: (params:{}) => post(`employee/add`, params),

 login: (params:{}) => post(`login`, params)

}


export { HttpManager }