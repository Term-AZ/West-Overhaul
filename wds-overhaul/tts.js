document.addEventListener('DOMContentLoaded', function () {
  const speakables = document.querySelectorAll('.speakable');

  let isTTSActive = false;
  let synth = window.speechSynthesis;
  let focusedElement = null;

  function speak(text) {
      let utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
  }

  function enableTTS() {
      isTTSActive = true;
      speak("You have enabled text-to-speech");
  }

  function disableTTS() {
      isTTSActive = false;
  }

  function handleSpeakableHover(event) {
      if (isTTSActive) {
          let text = event.currentTarget.getAttribute('data-text');
          speak(text);
      }
  }

  function handleFocus(event) {
      if (isTTSActive) {
          focusedElement = event.target;
          let text = focusedElement.getAttribute('data-text');
          speak(text);
      }
  }

  function handleBlur() {
      if (isTTSActive) {
          focusedElement = null;
      }
  }

  function handleKeyDown(event) {
      // Check if F6 key is pressed (key code 117 for F6)
      if (event.keyCode === 115) {
          isTTSActive ? disableTTS() : enableTTS();
      }
  }

  document.addEventListener('keydown', handleKeyDown);

  speakables.forEach(element => {
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
  });


  function speakNote() {
    var editorContent = document.querySelector('.ql-editor').innerText;
    var utterance = new SpeechSynthesisUtterance(editorContent);
    window.speechSynthesis.speak(utterance);
  }

  document.getElementById('playNoteButton').addEventListener('click', speakNote);

});
