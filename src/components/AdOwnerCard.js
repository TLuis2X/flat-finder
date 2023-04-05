import {useState} from 'react'
import {Modal, Form, Row, Col, Button, Input} from 'antd'
import Lottie from '@amelix/react-lottie'
import { successOptions } from '@/utils'
import { Avatar } from '@chakra-ui/react';
import { MessageOutlined } from '@ant-design/icons';
import MessageService from '@/services/messageService';



function AdOwnerCard({owner, user_id}) {

  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const messageService = new MessageService()

  async function handleOk(){
    if (content) {
      setConfirmLoading(true);
      //send message api call
      // const response = messageService.addMessage(content)
      const response = await messageService.addMessage(user_id, content, owner.id)
      console.log(response)
      setConfirmLoading(false)
      setSuccess(true)
      setTimeout(()=>{
        setOpen(false);
        setSuccess(false);
      }, 2000)

    } else{
      alert('no content!')
    }
  }

  function handleCancel(){
    setContent('')
    setOpen(false)
  }

  return (
    <>
    <div className="card hover-bg" 
      style={{display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '1rem',
      padding: '2rem'}}>

      <h4 style={{position: 'relative', top: 0, right: 0, fontStyle: 'italic'}}>Ad Owner</h4>
      <Avatar size='xl' src={owner.avatar_url} name={owner.name}/>
      <p style={{ margin: 0, marginBottom: 5, fontWeight: 600, fontSize: 16}}>{owner.name}</p>
      <p style={{ margin: 0 }}>{owner.email}</p>
      <Button 
        onClick={() => setOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center'}}type="primary" icon={<MessageOutlined />} block>
        Send Message
      </Button>
    </div>
      <Modal
      // title="Message to ad owner"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}>
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
                placeholder="e.g. What is your availability for viewings?"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Item>
      </Form>
    )}
  </Modal>
  </>
  )
}


export default AdOwnerCard