function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const button = document.getElementById('colorButton');

let scale = 1;

button.addEventListener('click', function () {
  document.body.style.backgroundColor = getRandomColor();

  scale += 0.2;
  button.style.transform = `scale(${scale})`;
});
