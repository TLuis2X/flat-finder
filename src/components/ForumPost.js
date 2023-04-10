import React, { useState } from "react";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import { Modal, Form, Row, Col, Button, Input } from "antd";
import Lottie from "@amelix/react-lottie";
import { successOptions } from "@/utils";
import { Popconfirm } from "antd";
import { DeleteTwoTone, MessageTwoTone } from "@ant-design/icons";
import ForumPostService from "@/services/ForumPostService";
import MessageService from "@/services/messageService";
import { addMessage } from "@/redux/messagesSlice";
import { addConversation } from "@/redux/conversationSlice";
import { useDispatch } from "react-redux";

function ForumPost({ forumPost, user_id, setForumPosts }) {
  const { author } = forumPost;

  const [showIcon, setShowIcon] = useState(false);
  const forumPostService = new ForumPostService();

  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const messageService = new MessageService();
  const dispatch = useDispatch();

  async function handleOk() {
    if (content && !success) {
      setConfirmLoading(true);
      const {message, conversation} = await messageService.addMessage(
        user_id,
        content,
        author.id
      );
      // console.log('Response from adding message: ', response)
      
      dispatch(addMessage(message))
      dispatch(addConversation(conversation));

      // console.log(response);
      setConfirmLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } else {
      // alert("no content!");
    }
  }

  function handleCancel() {
    setContent("");
    setOpen(false);
  }

  async function handleDelete() {
    const { error } = await forumPostService.removeForumPost(forumPost.id);
    if (!error)
      setForumPosts((prev) => prev.filter((post) => post.id !== forumPost.id));
  }

  return (
    <>
      <div
        className={author.id === user_id ? "hover-up" : undefined}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        style={{
          // borderTop: '1px solid #c7c7c7',
          display: "flex",
          height: 75,
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem",
          width: "80%",
        }}
      >
        <Avatar size="md" name={author.name} src={author.avatar_url} />
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
        {user_id === author.id
          ? showIcon && (
              <Popconfirm
                title="Delete post"
                description="Do you wish to delete this forum post?"
                onConfirm={handleDelete}
                // onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone
                  twoToneColor="#eb2f96"
                  className="fade-in"
                  style={{ fontSize: 20 }}
                />
              </Popconfirm>
            )
          : showIcon && (
              <MessageTwoTone
                className="fade-in"
                style={{ fontSize: 20 }}
                onClick={() => setOpen(true)}
              />
            )}
      </div>
      <Modal
        // title="Message to ad owner"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        footer={success ? <></> : undefined}
        onCancel={handleCancel}
      >
        {success ? (
          <div>
            <Lottie options={successOptions} height={300} width={300} />
          </div>
        ) : (
          <Form layout="vertical">
            <Form.Item
              name="Message"
              label="Message"
              rules={[
                {
                  required: true,
                  message: "Please enter message",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                value={content}
                placeholder="e.g. Would you like to buddy up?"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
export default ForumPost;
