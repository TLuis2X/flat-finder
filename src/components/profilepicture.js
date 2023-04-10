import React from "react";
//import "./index.css";
import { PlusOutlined, LoadingOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import { Upload, message, Image } from "antd";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { beforeUpload, getBase64 } from "@/utils";

import UserService from "@/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarUrl } from "@/redux/userSlice";


const ProfilePicture = ({ url, name }) => {
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(0);
  const supabase = useSupabaseClient();
  const userService = new UserService()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handleChange = async (info) => {
    console.log(info)
    const avatarFile = info.file.originFileObj
    if (info.file.status === "uploading" && !loading) {
      setLoading(true);
      const { data, error } = await supabase
      .storage
      .from('assets')
      .upload(avatarFile.name, avatarFile, {
        cacheControl: '3600',
        upsert: true
      })
      console.log({data, error})
      return;
    }
    if (info.file.status === "done" && loading) {
      // Get this url from response in real world.
      setHasRun(prev => prev+1)
      getBase64(info.file.originFileObj, (url) => {
      const { data } = supabase.storage
        .from('assets')
        .getPublicUrl(avatarFile.name)
        userService.updateAvatar(supabase, data.publicUrl, user.id)     
        console.log('PublicUrl that should work! : ', data.publicUrl) 
        // setImageUrl(data.publicUrl);
        dispatch(setAvatarUrl(data.publicUrl))
        setLoading(false);
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
        <Avatar size='xl' name={name} src={user.avatar_url}/>
      </Upload>
    </>
  );
};
export default ProfilePicture;
      

    