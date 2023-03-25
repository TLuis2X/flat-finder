import React from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { DashboardFilled, PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
  Modal
} from "antd";
import { useState, useEffect } from "react";
import { suffixSelector, beforeUpload, getBase64 } from "@/utils";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormLabel } from "react-bootstrap";
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const getBase64Url = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SITE_KEY_HCAPTCHA = "63ab0739-ef17-4588-96f7-9d7d30fe3c68"


function AddListingComponent({ listing, setListing, user_id }) {

  const supabase = useSupabaseClient();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  //Before adding the listing to db, make sure to delete temp_fileList prop.
  function updateFileList(info) {
    setListing(prevListing => ({
      ...prevListing, temp_fileList: info.fileList
    }))
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Url(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  }

  const handleUploadChange = async (info) => {
    console.log(info)
    const originFile = info.file.originFileObj
    if (info.file.status === "uploading") {
      // setLoading(true);
      console.count("Call")
      const imgName = originFile.name + String(user_id)
      const { data, error } = await supabase.storage.from('listing-images')
      .upload(imgName, originFile, {
        cacheControl: '3600',
        upsert: false
      })
      console.log({data, error})
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (_) => {
      const { data } = supabase.storage
        .from('listing-images')
        .getPublicUrl(originFile.name)

        const url = data.publicUrl
        console.log('Url received', {url})
        setListing((prevListing) => ({
          ...prevListing, images: prevListing.images.concat([url])
        }))
      });
    }
  };


  const handleChange = (e, field, nestedField) => {
    const { value } = e.target;
    setListing((prevListing) => {
      if (nestedField) {
        return {
          ...prevListing,
          [field]: { ...prevListing[field], [nestedField]: value },
        };
      } else {
        return { ...prevListing, [field]: value };
      }
    });
  };
  

  return (
    <div>
      <Form
        labelCol={{span: 5}}
        wrapperCol={{span: 10}}
        layout="horizontal"
        style={{maxWidth: 3000}}
      >
        <Form.Item label="Property title">
          <Input 
            value={listing.title}
            onChange={ (e) => handleChange(e, 'title')}
          />
        </Form.Item>
        <Form.Item label="Address (first line)">
          <Input 
            value={listing.address.first_line}
            onChange={ (e) => handleChange(e, 'address', 'first_line')}
          />
        </Form.Item>
        <Form.Item label="Address (second line)" >
          <Input 
            value={listing.address.second_line}
            onChange={ (e) => handleChange(e, 'address', 'second_line')}
          />
        </Form.Item>
        <Form.Item label="City" >
          <Input 
            value={listing.address.city}
            onChange={ (e) => handleChange(e, 'address', 'city')}
          />
        </Form.Item>
        <Form.Item label="Country" >
          <Input 
            value={listing.address.country}
            onChange={ (e) => handleChange(e, 'address', 'country')}
          />
        </Form.Item>
        <Form.Item label="Postcode" >
          <Input 
            value={listing.address.postcode}
            onChange={ (e) => handleChange(e, 'address', 'postcode')}
          />
        </Form.Item>
        <Form.Item label="Monthly rent">
          <InputNumber
            addonBefore={suffixSelector}
            style={{
              width: "100%",
            }}
            step={50}
            value={listing.monthly_price}
            onChange={(value) => setListing(prevListing => ({
              ...prevListing, monthly_price: value
            }))}
          />
        </Form.Item>
        <Form.Item label="Deposit">
          <InputNumber
            addonBefore={suffixSelector}
            style={{
              width: "100%",
            }}
            step={50}
            value={listing.deposit}
            onChange={(value) => setListing(prevListing => ({
              ...prevListing, deposit: value
            }))}
          />
        </Form.Item>
        <Form.Item label="Contract duration(Months)">
          <InputNumber
           value={listing.contract_length}
           onChange={(value) => setListing(prevListing => ({
            ...prevListing, contract_length: value
          }))}
          />
        </Form.Item>
          <Form.Item label="Bathrooms">
            <InputNumber 
              value={listing.key_features.bathrooms}
              min={1}
              onChange={(value) => setListing(prevListing => ({
                ...prevListing, key_features: {...prevListing.key_features, bathrooms: value }
              }))}
            />
          </Form.Item>
          <Form.Item label="Beds">
            <InputNumber 
              value={listing.key_features.beds}
              min={1}
              onChange={(value) => setListing(prevListing => ({
                ...prevListing, key_features: {...prevListing.key_features, beds: value }
              }))}
            />
        </Form.Item>
        <Form.Item label="Property description">
          <TextArea rows={6} 
            value={listing.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </Form.Item>
        <Form.Item label="Key Features">
          <Row>
            <Col span={10}>
              <Checkbox
                style={{
                  lineHeight: '32px',
                }}
                checked={listing.key_features.pets_allowed}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, pets_allowed: e.target.checked }
                }))}
              >
                Pets allowed
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                checked={listing.key_features.smoking_allowed}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, smoking_allowed: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Smoking allowed
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                checked={listing.key_features.station_nearby}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, station_nearby: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Station nearby
              </Checkbox>
            </Col>
            <Col span={10}>
              <Checkbox
                checked={listing.key_features.gym_nearby}
                onChange={(e) => setListing(prevListing => ({
                  ...prevListing,
                  ['key_features']: { ...prevListing.key_features, gym_nearby: e.target.checked }
                }))}
                style={{
                  lineHeight: '32px',
                }}
              >
                Gym nearby
              </Checkbox>
            </Col> 
          </Row>
      </Form.Item>
        <Form.Item label="Listing pictures" valuePropName="fileList">
          <Upload listType="picture-card"
            fileList={listing.temp_fileList}
            onPreview={handlePreview}
            beforeUpload={beforeUpload}
            onChange={updateFileList}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        {/* <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}
          <Form.Item label="Human Verification">
            <HCaptcha
              sitekey={SITE_KEY_HCAPTCHA}
              onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
              />
          </Form.Item>
        <Form.Item>
          <Button type='primary'  htmlType="submit" >Create listing</Button>
        </Form.Item>
      </Form>
      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default AddListingComponent
