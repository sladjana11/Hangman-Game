let wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('popup-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// Part of the body const
const figureParts = document.querySelectorAll('.figure-parts');

getRandomWords();

// Fetch random words
function getRandomWords(){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a8d286c2a1msh6e9c51a8e53bef6p1125bfjsnf7b9a2d69080',
      'X-RapidAPI-Host': 'random-word-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  fetch('https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword?type=verb', options)
    .then(response => response.json())
    .then(data => {
      const user = data.word;
      selectedWord = data.word;
      displayWord();
    })
    .catch(err => console.error(err));
}


// Words definition
let selectedWord = '';

const correctLetters = [];
const wrongLetters = [];

// Show hidden words
function displayWord(){
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')
    } 
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if(innerWord === selectedWord){
    // console.log(selectedWord);
    finalMessage.innerText = 'Congratulation!!! You WON!';
    popup.style.display = 'flex';
  }
}

  // Update Wrong Letter function
  function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span> ${letter}</span>`)}
    `;
      //display parts of the body
      figureParts.forEach(function(part,index) {
        const errors = wrongLetters.length;
        if(index < errors){
          part.style.display = 'block';
        } else{
          part.style.display = 'none';
        }
      });
      // Check if lost
      if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = `Unfortunately, you lost. Correct word was ${selectedWord}`;
        popup.style.display = 'flex';
      }
  }

  // Show Notification
  function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    },2000);
  }

  //Keydown letter press
  window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <=90){
      const letter = e.key;
      if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
          correctLetters.push(letter);
          displayWord();
        } else{
          showNotification();
        }
      } else{
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else{
          showNotification();
        }
      }
    }
  })

  // Restart Game and Play Again button
  playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    getRandomWords();
    updateWrongLettersEl();
    popup.style.display = 'none';
  })
