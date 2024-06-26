import React, {useState, useEffect} from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import axios from 'axios';
import './prism-vsc-dark-plus.css';
import { useSelector } from 'react-redux'
import './editor.css';

import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function CEditor({questionAttemptId, codeSnippet}) {
  /*
    const codeSnippet = `function add(a, b) {
        return a + b;
      }`
    */  
     
/*
const codeSnippet = `#include <stdio.h>
int main() {
  // Funtions declarations
    
  //Function calls
    printf("Hello World");
    return 0;
}`
*/
    const rootpath = useSelector((state) => state.rootpath.value)
    const [output, setOutput] = useState('');
    const [code, setCode] = useState(codeSnippet);
    
    useEffect(() => {
        setCode(codeSnippet)
    },[codeSnippet])
    

    const run_code = async () => {
      var url2 = rootpath + '/api/question_attempts/' + questionAttemptId + '/test_doodle'
      const response = await axios.post(url2,{code: code})
      setOutput(response.data.output)
    }  

  return (
    <>
     <Container>
     <Row>
      <Col xs={8}>
      </Col>
      <Col>
        <button onClick={run_code}>Execute</button>
      </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div className="window">
          <div className="title-bar">
            <div className="title-buttons">
              <div className="title-button"></div>
              <div className="title-button"></div>
              <div className="title-button"></div>
            </div>
          </div>
          <div className="editor_wrap">
          <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
          />
          </div>
          </div>
        </Col>
        <Col className = "mt-4 mb-4" style={{ color: "yellow", backgroundColor:"#333300"}}>
          {output}
        </Col>
      </Row>
    
    </Container>
  
  </>
  )
}

export default CEditor