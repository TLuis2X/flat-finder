export default class ForumPostService {
  url = "https://flat-finder-server.onrender.com";

  async getForumPosts(forum_id) {
    const response = await fetch(`${this.url}/forum-posts?forum_id=${forum_id}`);

    if (response.ok) {
      const posts = await response.json();
      return posts;
    }
    return response;
  }

  async getPostById(post_id) {
    const response = await fetch(`${this.url}/forum-post?post_id=${post_id}`);

    if (response.ok) {
      const post = await response.json();
      return post;
    }
    return response;
  }



  async addForumPost(user_id, content, forum_id) {
    const response = await fetch(`${this.url}/forum-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: user_id,
        content,
        forum: forum_id,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.data[0];
    }
    return response;
  }

  async removeForumPost(forum_post_id) {
    const response = await fetch(`${this.url}/forum-post`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        forum_post_id,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
    return response;
  }
}
