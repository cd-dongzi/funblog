import { Page } from './page';
import { Post } from './post';
import { User } from './userRole';
export declare enum CommentStatus {
    APPROVED = "approved",
    PENDING = "pending",
    SPAM = "spam"
}
export declare enum CommentType {
    POST = "post",
    PAGE = "page",
    MESSAGE_BOARD = "message_board"
}
export interface Comment {
    id: number;
    path: string;
    content: string;
    status: CommentStatus;
    createdAt: string;
    type?: CommentType;
    user: User;
    userId: number;
    replierUserId?: number;
    replierUser?: User;
    parentId?: number | null;
    parent: Comment;
    children?: Comment[];
    postId?: number;
    post?: Post;
    pageId?: number;
    page?: Page;
}
