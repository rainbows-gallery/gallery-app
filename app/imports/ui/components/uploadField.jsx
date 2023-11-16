import React, { useRef, useEffect } from 'react';

const UploadField = ({onUpload}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dv9xwi8q2',
      uploadPreset: 'hshq458b'
    }, (error, result) => {
      onUpload(result)
    })
  }, [])

  return (
    <button onClick={() => {widgetRef.current.open()}}>
      Upload
    </button>
  )
}

export default UploadField;