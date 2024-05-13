export interface companycreateschema {
  companyName: string;
  contactEmail: string;
}
export interface companyupdateschema {
  companyName?: string;
  logo?: string;
  contactPhone?: string;
  websiteLink?: string;
  location?: string;
  contactEmail?: string;
  contactPerson?: string;
  numberOfEmployees?: number;
  address?: string;
  companyDescription?: string;
}
