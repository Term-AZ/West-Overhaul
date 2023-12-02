document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const speakables = document.querySelectorAll('.speakable');
  
    let isTTSActive = false;
    let synth = window.speechSynthesis;
    let focusedElement = null;
  
    function speak(text) {
      let utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  
    function toggleTTS() {
      isTTSActive = !isTTSActive;
      toggleBtn.textContent = isTTSActive ? 'Turn off TTS' : 'Turn on TTS';

      if (isTTSActive && window.location.pathname === './pricing.html') {
        speak("Welcome to the specific page. This is a sample message.");
      }
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

    toggleBtn.addEventListener('click', toggleTTS);
    speakables.forEach(element => {
      element.addEventListener('mouseover', handleSpeakableHover);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    });
  });
