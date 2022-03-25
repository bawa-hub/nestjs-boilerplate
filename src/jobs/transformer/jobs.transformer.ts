import { Transformer } from "@libs/core";
import { JobDocument } from "../interface";

export class JobsTransformer extends Transformer {
    async transform(job: JobDocument):Promise<Record<string, any> | null>{
        return {
            id: job.uuid,
            profile: job.profile,
            title: job.title,
            desc: job.desc,
            company: job.company,
            createdAt: job.createdAt,
        }
    }
}
