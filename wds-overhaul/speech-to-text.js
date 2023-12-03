document.addEventListener('DOMContentLoaded', function () {
    const startSpeechRecognitionBtn = document.getElementById('startSpeechRecognition');
    const editor = document.getElementById('editor');
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    let isRecognitionOn = false;
    let currentContent = "";
  
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  
    startSpeechRecognitionBtn.addEventListener('click', function () {
      if (!isRecognitionOn) {
        recognition.start();
        isRecognitionOn = true;
        startSpeechRecognitionBtn.textContent = 'Stop Speech Recognition';
      } else {
        recognition.stop();
        isRecognitionOn = false;
        startSpeechRecognitionBtn.textContent = 'Start Speech Recognition';
      }
    });

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      currentContent = transcript;
      const cursorPosition = quill.getSelection();
      quill.insertText(quill.getLength(), `${currentContent}`, 'user');
    };
  
    recognition.onend = function () {
      if (isRecognitionOn) {
        recognition.start(); // Restart recognition after it ends
      }
    };
  
    recognition.onerror = function (event) {
      console.error('Speech recognition error:', event.error);
      // Handle errors as needed
    };
});
