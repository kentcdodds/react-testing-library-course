// this is just a fake module to simulate loading a greeting from a server
const greetings = ['Hello', 'Hi', 'Hey there', `What's up`, 'Howdy', `G'day`]

async function loadGreeting(subject) {
  return {data: {greeting: `${await fetchRandomGreeting()} ${subject}`}}
}

function fetchRandomGreeting() {
  return Promise.resolve(
    greetings[Math.floor(Math.random() * greetings.length)],
  )
}

export {loadGreeting}
