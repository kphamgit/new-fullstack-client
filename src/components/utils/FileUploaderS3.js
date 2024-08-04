import React, { useState } from 'react';

const FileUploaderS3 = () => {
  const [file, setFile] = useState(null);
  const [s3_path, setS3Path] = useState('')

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
        console.log('Uploading file...');
        const formData = new FormData();
        formData.append('s3_file_path',s3_path)
        formData.append('file', file);
        const rootpath = 'http://localhost:5001'
        const url = `${rootpath}/api/uploads/do_upload_single` 
        try {
          // You can write the URL of your server or any other endpoint used for file upload
          const result = await fetch(url, {
            method: 'POST',
            body: formData,
          });
  
          const data = await result.json();
  
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
        <label name='s3_file_path'>S3 Path</label>
        <input  type="text" size = "65" value = {s3_path} onChange={e => setS3Path(e.target.value)}/>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
};

export default FileUploaderS3;