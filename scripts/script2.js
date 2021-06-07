// script.js

import { router } from './router.js';

const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5, e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Instantiate the SDK. CDN will expose splitio globally 
var factory = splitio({ 
  core: {
    authorizationKey: 'ud0lbd78uputbn440s0valv0n5c8rum414nk',
    
    // your internal user id, or the account id that 
    // the user belongs to. 
    // This coudld also be a cookie you generate  18h9r5qrmrqja1bsgrnms5icbj3hrnvomocp
    // for anonymous users
    key: 'user' + getRandomInt(100000000000),
    // an OPTIONAL traffic type, if provided will be
    // used for event tracking with the SDK client.
    //trafficType: 'A_TRAFFIC_TYPE'
  }
});
// And get the client instance you'll use
var client = factory.client();

client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment("column");
  if (treatment == "on") {
    //document.querySelector('main').classList.add('double-column');
  } else if (treatment == "off") {
    document.querySelector('main').remove('entry-image');
  }
});