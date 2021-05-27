
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CommentInput {
    content: string;
    postId: string;
}

export interface CreatePostInput {
    content: string;
    title: string;
}

export interface Post {
    id: string;
    title: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    comments?: Comment[];
    author?: User;
}

export interface Comment {
    id: string;
    content: string;
    post?: Post;
}

export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface IQuery {
    getAllPosts(keyword?: string, skip?: number, take?: number): Post[] | Promise<Post[]>;
    getPostById(id: string): Post | Promise<Post>;
    author(id: string): User | Promise<User>;
}

export interface IMutation {
    createPost(input: CreatePostInput): Post | Promise<Post>;
    addComment(input: CommentInput): Comment | Promise<Comment>;
}

export interface ISubscription {
    commentAdded(): Comment | Promise<Comment>;
}
