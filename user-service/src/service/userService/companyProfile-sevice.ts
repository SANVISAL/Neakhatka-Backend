

import { ICompanyDocument } from "../../database/@types/company-interface";
import CreateCompanyrepo from "../../database/repository/userRepository/companyProfileRepo"


class CompanyService{
    private companyrepo :CreateCompanyrepo;
    constructor (){
        this.companyrepo= new CreateCompanyrepo();
    }
     async Create(companydetail:ICompanyDocument){
        try{
            const company = await this.companyrepo.Create(companydetail)
            return company;

        }catch(error){
            throw error
        }
    }
    
}

export default CompanyService;