const words = [
  ["ܐܵܢܵܐ ܐܝܼܘܸܢ", "I am (m)", "audio_CG05.mp3", "11:32", "11:37"],
  ["ܐܵܢܵܐ ܐܝܼܘܲܢ", "I am (f)", "audio_CG05.mp3", "11:47", "11:51"],
  ["ܐܵܝܸܬ ܐܝܼܘܲܬ", "You are (m)", "audio_CG05.mp3", "12:41", "12:43"],
  ["ܐܵܝܲܬܝ ܐܝܼܘܲܬ̤", "You are (f)", "audio_CG05.mp3", "12:44", "12:46"],
  ["ܐܵܗܘܼ ܐܝܼܠܸܗ", "He is", "audio_CG05.mp3", "13:20", "13:25"],
  ["ܐܵܗܝܼ ܐܝܼܠܵܗ̇", "She is", "audio_CG05.mp3", "13:29", "13:31"],
  ["ܐܲܚܢܝܼܢ݇ ܐܢܼܘܘܼܟܼ", "We are", "audio_CG05.mp3", "13:41", "13:45"],
  ["ܐܲܟܼܬܘܼܢ ܐܝܼ݇ܘܘܿܬܘܼܢ", "You (plural) are", "audio_CG05.mp3", "13:49", "14:14"],
  ["ܐܲܘ݇ܢܝܼ ܐܝܼܠܵܝ", "They are", "audio_CG05.mp3", "14:15", "14:18"]
];

const keyMap = {
  'q': 'ܩ', 'w': 'ܘ', 'e': 'ܖ', 'r': 'ܪ', 't': 'ܬ', 'y': 'ܝ', 'u': 'ܜ', 'i': 'ܥ', 'o': 'ܧ', 'p': 'ܦ', 'a': 'ܐ', 's': 'ܣ', 'd': 'ܕ', 'f': 'ܔ', 'g': 'ܓ', 'h': 'ܗ', 'j': 'ܛ', 'k': 'ܟ', 'l': 'ܠ', 'z': 'ܙ', 'x': 'ܨ', 'c': 'ܤ', 'v': 'ܫ', 'b': 'ܒ', 'n': 'ܢ', 'm': 'ܡ',
  'Shift-q': 'ܰ', 'Shift-w': '', 'Shift-e': '', 'Shift-r': '', 'Shift-t': '', 'Shift-y': '', 'Shift-u': '', 'Shift-i': '', 'Shift-o': '', 'Shift-p': '', 'Shift-a': '', 'Shift-s': '', 'Shift-d': '', 'Shift-f': '', 'Shift-g': '', 'Shift-h': '', 'Shift-j': '', 'Shift-k': '̤', 'Shift-l': '', 'Shift-z': 'ܲ', 'Shift-x': 'ܵ', 'Shift-c': 'ܸ', 'Shift-v': 'ܼ', 'Shift-b': 'ܿ', 'Shift-n': 'ܹ', 'Shift-m': '',
  'Alt-q': '', 'Alt-w': '', 'Alt-e': '', 'Alt-r': '', 'Alt-t': '', 'Alt-y': '', 'Alt-u': '', 'Alt-i': '', 'Alt-o': '', 'Alt-p': '', 'Alt-a': '', 'Alt-s': '', 'Alt-d': '', 'Alt-f': '', 'Alt-g': '', 'Alt-h': '', 'Alt-j': '', 'Alt-k': '', 'Alt-l': '', 'Alt-z': '', 'Alt-x': '', 'Alt-c': '', 'Alt-v': '', 'Alt-b': '', 'Alt-n': '', 'Alt-m': ''
};

let currentMode = "syriac_to_english";
let currentWordIndex = 0;
let hintCount = 0;
let hinter = "";

document.getElementById('mode-button').addEventListener('click', switchMode);
document.getElementById('answer-button').addEventListener('click', checkAnswer);
document.getElementById('next-button').addEventListener('click', nextWord);
document.getElementById('hint-button').addEventListener('click', provideHint);
document.getElementById('pronounce-button').addEventListener('click', pronounce);
document.getElementById('answer-input').addEventListener('keydown', doKey);

function switchMode() {
  currentMode = currentMode === "syriac_to_english" ? "english_to_syriac" : "syriac_to_english";
  document.getElementById('mode-button').textContent = currentMode === "syriac_to_english" ? "Switch to English-to-Syriac" : "Switch to Syriac-to-English";
  nextWord();
}

function nextWord() {
  currentWordIndex = Math.floor(Math.random() * words.length);
  const question = currentMode === "syriac_to_english" ? words[currentWordIndex][0] : words[currentWordIndex][1];
  document.getElementById('question').textContent = question;
  document.getElementById('answer-input').value = '';
  document.getElementById('hint').textContent = '';
  document.getElementById('result').textContent = '';
  hintCount = 0;
  hinter = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer-input').value;
  const correctAnswer = currentMode === "syriac_to_english" ? words[currentWordIndex][1] : words[currentWordIndex][0];
  if (userAnswer === correctAnswer) {
    document.getElementById('result').textContent = "Correct!";
  } else {
    document.getElementById('result').textContent = "Incorrect!";
  }
}

function provideHint() {
  const hintText = currentMode === "syriac_to_english" ? words[currentWordIndex][1] : words[currentWordIndex][0];
  if (hintCount < hintText.length) {
    hinter += hintText[hintCount];
    document.getElementById('hint').textContent = hinter;
    hintCount++;
  }
}

function convertToSeconds(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return minutes * 60 + seconds;
}

function pronounce() {
  const audioFile = words[currentWordIndex][2];
  const startTime = convertToSeconds(words[currentWordIndex][3]);
  const endTime = convertToSeconds(words[currentWordIndex][4]);
  const audio = new Audio(audioFile);
  audio.currentTime = startTime;
  audio.play();
  setTimeout(() => audio.pause(), (endTime - startTime) * 1000);
}

function doKey(event) {
  if (currentMode === "english_to_syriac") {
    let key = event.key;
    if (event.shiftKey) {
      key = `Shift-${key}`;
    } else if (event.altKey) {
      key = `Alt-${key}`;
    }
    const char = keyMap[key];
    if (char) {
      event.preventDefault();
      const input = document.getElementById('answer-input');
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.value = input.value.substring(0, start) + char + input.value.substring(end);
      input.setSelectionRange(start + char.length, start + char.length);
    }
  }
}

// Initialize the first word
nextWord();