
import { category } from './category'
import { User } from './user';

export class Feedback {
    id:string;
    title: string;
    subject: string;
    content: string;
    rating: number;
    category: category;
    user: User;
    createdAt:Date;
}