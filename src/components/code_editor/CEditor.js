import React, {useState} from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import axios from 'axios';
import './prism-vsc-dark-plus.css';
import { useSelector } from 'react-redux'
import './editor.css';

function CEditor({questionAttemptId}) {
  /*
    const codeSnippet = `function add(a, b) {
        return a + b;
      }`
    */  


const codeSnippet = `#include <stdio.h>
int main() {
    // Write C code here
    printf("My code snippet");

    return 0;
}`

      const rootpath = useSelector((state) => state.rootpath.value)
    const [code, setCode] = useState(codeSnippet);
    
    const run_code = async () => {
      console.log("COOOOOOODE", code)
      var url2 = rootpath + '/api/question_attempts/' + questionAttemptId + '/test_doodle'
      await axios.post(url2,{code: code})
    }  

  return (
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
    <div><button onClick={run_code}>Execute</button></div>
  </div>
  )
}

export default CEditor