import { ICompanyDocument } from "../../model/company.repository.model";

export interface companycreateschema {
  companyName: string;
  contactEmail: string;
}
// export interface DeleteCompanyRequest {
//   id: string;
// }

export interface companyupdateschema extends Partial<ICompanyDocument> {
  companyName?: string;
  logo?: string;
  contactPhone?: number;
  websiteLink?: string;
  location?: string;
  contactEmail?: string;
  contactPerson?: string;
  numberOfEmployees?: number;
  address?: string;
  companyDescription?: string;
}
