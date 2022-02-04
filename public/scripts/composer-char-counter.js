$(document).ready(function() {

  const counter = function() {
    const $inputField = $('#tweet-text');

    $inputField.on('input', function() {
      let $count = 140 - $('textarea').val().length;
      
      if ($count < 0) {
        $('.counter').css('color', 'red');
      } else {
        $('.counter').css('color', '');
      }
      $('.counter').text($count);
    })
  }
  $(function() {
    counter();
  })



});