import { Vote } from './vote.model';

export interface Comment {
    content: string;
    commentedOn: string;
    author: string;
    votes?: Vote;
    createdAt: Object;
    updatedAt: Object;
}