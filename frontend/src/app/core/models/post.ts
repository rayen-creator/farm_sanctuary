import { User } from 'src/app/core/models/user';
enum topic {
    farming = "farming",
    agriculture = "agriculture",
    ranching = "ranching",
}
export class Post {
    id:string
    image: string
    title: string
    text: string
    likes: number
    topic: topic
    user: User
    comments: [Comment]
    createdAt: Date
    updatedAt: Date
};