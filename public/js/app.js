const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  fetch(`/weather?address=${location}`).then((response) => {
    // La méthode json() de Body lit un Stream Response jusqu'au bout. Elle retourne une promesse qui s'auto-résout en renvoyant le corps de la requête parsée au format JSON.
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        search.value = '';
      }
    });
  });
});
