import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [language, setLanguage] = useState('python');

  useEffect(() => {
    const listModels = async () => {
      try {
        const response = await axios.get('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    listModels();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are a code converter.` },
          { role: "user", content: `Convert the following code to ${language}:\n\n${inputCode}` }
        ],
        max_tokens: 150,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      });

      setOutputCode(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error converting code:', error);
    }
  };

  return (
    <div className="container">
      <h1>Code Converter</h1>
      <div className="dropdown">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">CPP</option>
          <option value="go">Go</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className="code-container">
        <textarea
          className="code-box"
          placeholder="Paste your code here"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          rows="20"
        />
        <textarea
          className="code-box"
          placeholder="Converted code will appear here"
          value={outputCode}
          readOnly
          rows="20"
        />
      </div>
      <button className="convert-button" onClick={handleConvert}>Generate</button>
    </div>
  );
};

export default App;
