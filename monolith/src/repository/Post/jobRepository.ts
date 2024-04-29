import { JobModel,IJob } from "../../model/Post/Job";

export class JobRepository {
  private jobModel = new JobModel();

  public async createJob(job: IJob): Promise<IJob> {
    return await this.jobModel.create(job);
  }

  public async getAllJobs(): Promise<IJob[]> {
    return await this.jobModel.getAll();
  }

  public async getJobById(id: string): Promise<IJob | null> {
    return await this.jobModel.getById(id);
  }

  public async updateJob(id: string, job: IJob): Promise<IJob | null> {
    return await this.jobModel.update(id, job);
  }

  public async deleteJob(id: string): Promise<IJob | null> {
    return await this.jobModel.delete(id);
  }
}
