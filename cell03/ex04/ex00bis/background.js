function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

$(document).ready(function() {
  let scale = 1;

  $('colorButton').on('click', function() {
    $('body').css('background-color', getRandomColor());

    scale += 0.2;

    $(this).css('transform', `scale(${scale})`);
  });
});