export default class ForumPostService {

    url = "https://flat-finder-server.onrender.com";

    async getForumPosts(forum_id) {
        const response = await fetch(`${this.url}/forum-post?forum_id=${forum_id}`)

        if (response.ok) {
            const posts = await response.json()
            return posts
        }
        return response
    }

    async addForumPost(user_id, content, forum_id) {
        const response = await fetch(`${this.url}/forum-post`,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id,
                content,
                forum_id
            })
          })

          if (response.ok) {
            const result = await response.json()
            return result
          }
          return response
    }

    async removeForumPost(forum_post_id) {
        const response = await fetch(`${this.url}/forum-post`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                forum_post_id
            })
          })

          if (response.ok) {
            const result = await response.json()
            return result
          }
          return response
    }

}
