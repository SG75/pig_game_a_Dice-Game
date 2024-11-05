let allVal = {
  x: 0,
  y: 0,
  z: 0,
};

const perFace = [
  [-0.1, 0.3, -1],
  [-0.1, 0.6, -0.4],
  [-0.85, -0.42, 0.73],
  [-0.8, 0.3, -0.75],
  [0.3, 0.45, 0.9],
  [-0.16, 0.6, 0.18],
];

const getVal = () => {
  $.each(allVal, (i, n) => {
    n = Math.cos(($(`#r${i}`).val() / 100) * 3.142).toFixed(3);
    $(`#n${i}`).html(n);
    Object.defineProperty(allVal, i, {
      value: n,
    });
  });
};

const setVal = num => {
  $('.dice').css('transform', `rotate3d(${perFace[num - 1]}, 180deg)`);
};

window.setDice = () => {
  getVal();
  $('.dice').css('transform', `rotate3d(${Object.values(allVal)}, 180deg)`);
};

setDice();

$('.controller input[type=range]').on('change', () => {
  setDice();
});

$('#rolling').on('click', () => {
  $('.dice').removeClass('throw');
  $('.dice').toggleClass('rolling');
});

$('#throw').on('click', () => {
  const diceVal = Math.floor(Math.random() * 5) + 1;
  $('.dice').removeClass('throw rolling');
  setVal(diceVal);
  $('#diceVal').empty();
  setTimeout(() => {
    $('.dice').addClass('throw');
  }, 50);
  setTimeout(() => {
    $('#diceVal').html(diceVal);
  }, 700);
  // console.log(diceVal);
  window.diceValue = diceVal;
});

$('#diceType').on('change', () => {
  const diceType = $('#diceType').val();
  $('.dice').removeClass('red blue black pink');
  $('.dice').addClass(diceType);
});
