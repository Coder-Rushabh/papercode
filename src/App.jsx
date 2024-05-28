import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [language, setLanguage] = useState('python');

  const handleConvert = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Convert the following code to ${language}:\n\n${inputCode}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        },
      });

      setOutputCode(response.data.choices[0].text);
    } catch (error) {
      console.error('Error converting code:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Code Converter</h1>
      <div>
        <textarea
          placeholder="Paste your code here"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          rows="10"
          cols="50"
        />
      </div>
      <div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>
      <button onClick={handleConvert}>Generate</button>
      <div>
        <textarea
          placeholder="Converted code will appear here"
          value={outputCode}
          readOnly
          rows="10"
          cols="50"
        />
      </div>
    </div>
  );
};

export default App;
