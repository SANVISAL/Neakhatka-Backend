import { IJob } from "../../schemas/Post/jobSchema";
import JobSchema from "../../schemas/Post/jobSchema";

export class JobModel {
  public async create(job: IJob): Promise<IJob> {
    return await JobSchema.create(job);
  }

  public async getAll(): Promise<IJob[]> {
    return await JobSchema.find();
  }

  public async getById(id: string): Promise<IJob | null> {
    return await JobSchema.findById(id);
  }

  public async update(id: string, job: IJob): Promise<IJob | null> {
    return await JobSchema.findByIdAndUpdate(id, job, { new: true });
  }

  public async delete(id: string): Promise<IJob | null> {
    return await JobSchema.findByIdAndDelete(id);
  }
}
export { IJob };

