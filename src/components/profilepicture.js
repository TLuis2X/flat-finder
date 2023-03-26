import React from "react";
//import "./index.css";
import { PlusOutlined, LoadingOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import { Upload, message, Image } from "antd";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { beforeUpload, getBase64 } from "@/utils";

import UserService from "@/services/UserService";


const ProfilePicture = ({ url, user_id,name }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const supabase = useSupabaseClient();
  const userService = new UserService()

  useEffect(() => {
    setImageUrl(url)
  }, [url])

  const handleChange = async (info) => {
    console.log(info)
    const avatarFile = info.file.originFileObj
    if (info.file.status === "uploading") {
      setLoading(true);
      const { data, error } = await supabase
      .storage
      .from('assets')
      .upload(avatarFile.name, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
      console.log({data, error})
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl(avatarFile.name)
        setLoading(false);
        userService.updateAvatar(supabase, data.publicUrl, user_id)      
        setImageUrl(data.publicUrl);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Avatar size='xl' name={name} src={imageUrl}/>
      </Upload>
    </>
  );
};
export default ProfilePicture;
      

      
// {imageUrl ? (
//   <Image
//   preview={false}
//   width={200}
//   src={imageUrl}
//   alt="avatar"
//   style={{
//     width: "100%",
//   }}
//   />
//   ) : (
//   uploadButton
//   )}

// import React, { useEffect, useState } from 'react'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import UserService from '@/services/UserService'
// import {Button} from 'antd'
// import styles from '../styles/dashboardright.module.css'

// export default function Avatar({ user, url }) {
//   const supabase = useSupabaseClient()
//   const userService = new UserService()
//   const [avatarUrl, setAvatarUrl] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => {
//     if (url) downloadImage(url)
//   }, [url])

//   useEffect(() => {
//     if (user) setAvatarUrl(user.avatar_url)
//   }, [user])

//   async function downloadImage(path) {
//     try {
//       const { data, error } = await supabase.storage.from('assets').download(path)
//       if (error) {
//         throw error
//       }
//       const url = URL.createObjectURL(data)
//       setAvatarUrl(url)
//     } catch (error) {
//       console.log('Error downloading image: ', error)
//     }
//   }

//   const onUpload = (filePath) => {
//     const {data} = supabase.storage
//     .from('assets')
//     .getPublicUrl(filePath)

//     // console.log(data)
//     setAvatarUrl(data.publicUrl)
//     userService.updateAvatar(supabase, data.publicUrl, user.id)
//   }


//   const uploadAvatar = async (event) => {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${user.id}.${fileExt}`
//       const filePath = `${fileName}`

//       let { error: uploadError } = await supabase.storage
//         .from('assets')
//         .upload(filePath, file, { upsert: true })

//       if (uploadError) {
//         throw uploadError
//       }

//       onUpload(filePath)
//     } catch (error) {
//       alert('Error uploading avatar!')
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       {avatarUrl ? (
//         <img
//           src={avatarUrl}
//           alt="Avatar"
//           className="avatar image"
//           style={{ height: 100, width: 100 }}
//         />
//       ) : (
//         <div className="avatar no-image" style={{ height: 100, width: 100 }} />
//       )}
//       <div style={{height: 30}}>
//         <label htmlFor="single">
//           {uploading ? 'Uploading ...' : 'Upload'}
//         </label>
//         <input
//           style={{
//             // visibility: 'hidden',
//             position: 'absolute',
//           }}
//           className={styles.input}
//           size='60'
//           type="file"
//           id="single"
//           accept="image/*"
//           onChange={uploadAvatar}
//           disabled={uploading}
//         />
//       </div>
//     </div>
//   )
// }