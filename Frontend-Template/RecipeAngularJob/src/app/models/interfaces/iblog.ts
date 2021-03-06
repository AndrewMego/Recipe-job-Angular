import { Icomment } from "./icomment";

export interface Iblog {
    blogID?: number;
    bodyBlog?: string;
    imgBlog?: any;
    userID?: number;
    location?: string;
    published_at?: String;
    title?: string;
    picOwnerBlog?: string
    description?: string
    comments?: Icomment[]
    myLiked?: boolean
}
