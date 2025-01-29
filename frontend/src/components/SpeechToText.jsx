import { useState } from "react";

function SpeechToText({ setQuestion, generateAnswer }) {
  const [isListening, setIsListening] = useState(false);

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Check for both

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);

      setTimeout(()=> generateAnswer(), 500);
    };

    recognition.onend=()=>{
      setIsListening(false); 
      // generateAnswer();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  }

  return (
    <button onClick={startListening} disabled={isListening}>
      🎤 {isListening ? "Listening..." : "Speak"}
    </button>
  );
}

export default SpeechToText;
