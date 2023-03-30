import React, { useState } from "react";
// import { Avatar } from "antd";
import { Avatar } from "@chakra-ui/react";

function ForumPost({ forumPost }) {
  const { author } = forumPost;

  return (
    <>
      <div
        style={{
          display: "flex",
          height: 75,
          alignItems: "flex-start",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        <Avatar size='md' name={author.name} src={author.avatar_url} />
        <div
          style={{
            height: "100%",
            width: "90%",
          }}
        >
          <p style={{ margin: 0, marginBottom: 5, fontWeight: 600 }}>
            {author.name}
          </p>
          <p style={{ margin: 0 }}>{forumPost.content}</p>
        </div>
      </div>
    </>
  );
}
export default ForumPost;
