import { Vote } from '../models/vote.model'

export interface Post {
    title: string;
    content: string;
    topic: string;
    author: string;
    votes?: Vote;
}