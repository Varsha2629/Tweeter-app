/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
$(document).ready(function() {
const tweetData  = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

const createTweetElement = function(data) {
  const $tweet = $(`
    <article>
    <div class="tweet-header">
      <img src=${data.user.avatars} />
      <p>${data.user.name}</p>
      <div class="user">${data.user.handle}</div>
    </div>
    <p id="tweet">${data.content.text}</p>
    <footer>
      <span>${timeago.format(data.created_at)}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>

  </article>

  `)/* Your code for creating the tweet element */
  // ...
  return $tweet;
}

renderTweets(tweetData);

$("form").submit(function(event) {
  alert("Handler for .submit() called.");
  event.preventDefault();
})
});
