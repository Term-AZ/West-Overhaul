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
        startSpeechRecognitionBtn.innerHTML = '';
        var newIcon = document.createElement("i");
        newIcon.classList.add("fas", "fa-microphone-slash")
        startSpeechRecognitionBtn.appendChild(newIcon);
      } else {
        recognition.stop();
        isRecognitionOn = false;
        startSpeechRecognitionBtn.innerHTML = '';
        var newIcon = document.createElement("i");
        newIcon.classList.add("fas", "fa-microphone")
        startSpeechRecognitionBtn.appendChild(newIcon);
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
