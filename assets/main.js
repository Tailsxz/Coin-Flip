//Lets first grab our DOM elements.
const flipButton = document.querySelector('#flipCoin')
const resultMessage = document.querySelector('#result');

//The url we will be using to fetch the random number
const url = '/api'

async function fetchRandomNum(url) {
  const response = await fetch(url);
  console.log(response);
  if (!response.ok) throw new Error(`Failed request with status code of ${response.status}`);

  const data = await response.json();
  resultMessage.textContent = `${data.randomNum > 1 ? 'Heads!' : 'Tails!'}`;
  resultMessage.style = 'opacity: 1;'
}

flipButton.addEventListener('click', () => {
  console.log('Flipping!');
  fetchRandomNum(url);
})