import React, { useState } from 'react';

function ControlledTextarea() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <textarea value={text} onChange={handleChange} />
  );
}

export default ControlledTextarea;
