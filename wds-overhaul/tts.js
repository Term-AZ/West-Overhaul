document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const speakables = document.querySelectorAll('.speakable');
  
    let isTTSActive = false;
    let synth = window.speechSynthesis;
  
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
  
    toggleBtn.addEventListener('click', toggleTTS);
    speakables.forEach(element => {
      element.addEventListener('mouseover', handleSpeakableHover);
    });
  });
  