const apiKey = "JGOGxD9wvI61n0xDGKGxCk1HlugeT9LL";
let url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

let response = await fetch(url, {
  method: 'GET'
});
console.log(response)

// data coming back from ticket master
let data = await response.json();