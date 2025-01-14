import { PostImage } from "./PostImage"
import { UserType } from "./User"

export type Post = {
    postId: number,
    User: UserType,
    content: string,
    createdAt: Date,
    Images: PostImage[],
    noImage?: boolean
  }