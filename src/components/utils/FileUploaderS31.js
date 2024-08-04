import React , {useState} from 'react'
import axios from 'axios'

export function FileUploaderS31() {
    
    const [file, setFile] = useState()
    const [s3_path, setS3Path] = useState('')

function handleChange(event) {
  setFile(event.target.files[0])
}

//api/uploads/do_upload_single">
//rootpath = 'https://www.tienganhtuyhoa.com'

function handleSubmit(event) {
  //const rootpath = 'https://www.tienganhtuyhoa.com'
  const rootpath = 'http://localhost:5001'
  event.preventDefault()
  const url = `${rootpath}/api/uploads/do_upload_single` 
  const formData = new FormData();
  formData.append("s3_file_path","images")
  formData.append('file', file);
  formData.append('fileName', file.name);
  
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.post(url, formData, config).then((response) => {
    console.log(response.data);
  });

}

    
return (
    <>
  <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange}/>
        <input  type="text" size = "65" value = {s3_path} onChange={e => setS3Path(e.target.value)}/>
        <button type="submit">Upload</button>
      </form>
  </div>
  <p>
  audios/dict/p	Copy path	 
audios/reading/razkids/level_aa
videos/reading/razkids/level_d
Path should not contain final slash "/"
Don't specify file name. Will use name of file uploaded
  </p>
  </>
);

}
