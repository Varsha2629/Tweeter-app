/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// const safeHTML = `<p>${escape(textFromUser)}</p>`;

$(() => {

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
    if(charCount === 140){
      alert('Please enter the text!!');
    } else if(charCount < 0) {
      alert('Oops too many character! \n  tweet accept only 140 char');
    } else {
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
  })
  // get(fetch) the data from the server using ajax
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data)
      })
  }

  loadTweets()


});
