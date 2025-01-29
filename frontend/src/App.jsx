import { useState } from 'react';

import axios from "axios";
import './App.css';


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {


    setAnswer("Loading..");
    try {
      const response = await axios.post("http://localhost:3000/ask-gemini", {
        question,
      });
      setAnswer(response.data.answer);
    }
    catch (error) {
      console.error('Error fetching response: ', error);
      setAnswer('Falied to fetch response. Please try again.');

    }
  }

  return (
    <>
      <h1>AI Chatbot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols='15'
        rows='10'
      ></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>{answer}</p>
    </>
  )
}

export default App
