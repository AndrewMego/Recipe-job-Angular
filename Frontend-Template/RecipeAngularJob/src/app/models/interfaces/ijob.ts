import { Iuser } from 'src/app/models/interfaces/iuser';
export interface Ijob {

    jobID?: Number,
    userID?: Iuser,
    title?: String,
    location?: String,
    jobType?: String,
    description?: String,
    published_at?: String,
    vacancy?: Number,
    qualification?: String,
    benefits?: String,
    gender?:String
    salary?: String,
    categoryID?: number,
    catName?: string
    experience?: String,
   ExEmail?: string
    jobTags?:any
}
