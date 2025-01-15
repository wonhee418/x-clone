import { PostImage } from "./PostImage"
import { UserType } from "./User"

export interface Post {
    postId: number,
    User: UserType,
    content: string,
    createdAt: Date,
    Images: PostImage[],
    noImage?: boolean
  }