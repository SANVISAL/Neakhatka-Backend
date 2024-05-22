import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import CompanyRepo from "../repository/company.repository";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoURL = await mongoServer.getUri(); // Using getUri for the latest version
  await mongoose.connect(mongoURL);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Company repositorty intergrate test",()=>{
    let companyrepo :CompanyRepo;
    beforeEach(()=>{
        companyrepo = new CompanyRepo()
    })
    describe("Create company profile",()=>{
        test("should be add new company profile to database!",async ()=>{
            const  MOCK_DATA ={
                companyName:"name_test",
                contactEmail:"test@gmail.com",
            }
            
        const newcompany = await companyrepo.Create(MOCK_DATA)
        expect(newcompany).toBeDefined();
        expect(newcompany.companyName).toEqual(MOCK_DATA.companyName)
        expect(newcompany.contactEmail).toEqual(MOCK_DATA.contactEmail);
        // check if comopany profile have in database
        const foundcompany = await companyrepo.Find_By_id({id :newcompany._id})
        expect(foundcompany).toBeDefined();
        expect(foundcompany?.companyName).toEqual(MOCK_DATA.companyName)
        })

    })

})

