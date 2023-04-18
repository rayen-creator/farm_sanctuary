import { Post } from "./post"
import { User } from "./user"

export class Comment {
    id: string
    content: string
    user: User
    post: Post
    createdAt: Date
    updatedAt: Date
}