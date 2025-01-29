import { useState } from 'react';
import axios from "axios";
import './App.css';
import SpeechToText from './components/SpeechToText';


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    if(!question.trim()) return; 
    setAnswer("Loading..");
    try {
      const response = await axios.post("http://localhost:3000/ask-gemini", {
        question
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
      <div style={{display:"flex", alignItems:"center", gap: "10px" }}>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols='30'
        rows='3'
        ></textarea>
        <SpeechToText setQuestion={setQuestion} generateAnswer={generateAnswer}/> {/* Using SpeechToText component*/}
        </div>
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>{answer}</p>
    </>
  );
}

export default App
