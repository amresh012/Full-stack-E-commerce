import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const Avatarupload = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'data:image/png;base64,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',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://images.deepmart.shop/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};
export default Avatarupload;