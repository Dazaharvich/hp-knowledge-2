// src/components/CustomImageUpload.jsx
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function CustomImageUpload({ value, onChange }) {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      }
    }
  }), []);

  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      
      try {
        const res = await axios.post('/api/cases', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const url = res.data.url;
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', url);
      } catch (err) {
        console.error('Error al subir la imagen', err);
      }
    };
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]}
    />
  );
}

export default CustomImageUpload;