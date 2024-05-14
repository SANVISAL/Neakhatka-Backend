
export interface createuser {
    firstName: string,
    lastName:string,
    email:string,
}


export interface updateuser{
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    contactPhone?: string;
    gender?: string;
    location?: string;
    dateOfBirth?: Date;
    nationality?: string;
    address?: string;
    educationBackground?: string;
}