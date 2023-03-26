export default class ForumPost{
    id;
    created_at;
    author;
    content;
    forum;

    constructor(forumPost){
        this.id = forumPost.id;
        this.created_at = forumPost.created_at;
        this.author = forumPost.author;
        this.content = forumPost.content;
        this.forum = forumPost.forum;
    }

}