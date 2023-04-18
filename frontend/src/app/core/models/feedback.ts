
import { category } from './category'

export class Feedback {
    id:string;
    title: string;
    subject: string;
    content: string;
    rating: number;
    category: category;
    user: string;
    createdAt:Date;
}