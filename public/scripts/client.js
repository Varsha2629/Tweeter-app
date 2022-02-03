/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json


//escape function to prevent XSS (cross site scripting)
const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// const safeHTML = `<p>${escape(textFromUser)}</p>`;


const backTopUpBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top")
      .show()
      .fadeIn("slow");
  } else {
    $(".back-to-top")
      .hide()
      .fadeOut("slow");
  }
};



$(() => {
  // hide back to top button at initial render
  $(".back-to-top").hide();

  // call backTopUpBtn on page scroll
  $(window).scroll(backTopUpBtn);
  // clicking on back to top
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  const renderTweets = function (tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const createTweetElement = function (data) {
    const $tweet = $(`
    <article>
    <div class="tweet-header">
      <img src=${data.user.avatars} />
      <p>${data.user.name}</p>
      <div class="user">${data.user.handle}</div>
    </div>
    <p id="tweet">${esc(data.content.text)}</p>
    <footer>
      <span>${timeago.format(data.created_at)}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>

  </article>

  `)
    return $tweet;
  }


  $("form").on('submit', (event) => {
    // create an AJAX POST request in client.js that sends the form data to the server.
    event.preventDefault();
    const charCount = Number($('.counter').val())

    if (charCount === 140) {
      $('.error-length').slideUp();
      $('.error-not').slideDown();
    } else if (charCount < 0) {
      $('.error-length').slideDown();
      $('.error-not').slideUp();
    } else {
      $('.error-length').slideUp();
      $('.error-not').slideUp();

      const param = $('#form').serialize();
      const url = $('#form').attr('action');

      $.post(url, param,
        function (data) {
          $('#tweet-text').val('');
          $('.counter').text(140);
          // tweetData.push(data);
          loadTweets();
        });
    }
  });
  // get(fetch) the data from the server using ajax
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data)
      })
  }

  loadTweets()

  //error message


});
