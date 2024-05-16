
import { ObjectId } from "mongoose";
export interface ICompanyDocument {
    _id ? : string | ObjectId
    companyName?: string;
    logo?: string;
    contactPhone?: string;
    websiteLink?: string;
    location?: string;
    contactEmail: string;
    contactPerson: string;
    numberOfEmployees: number;
    address: string;
    companyDescription: string;
    userId?: string | ObjectId 
}
