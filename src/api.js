// this is just a fake module to simulate saving a post from a server

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

async function savePost(postData) {
  // simulate the network request time...
  await sleep(1000)
  return {data: {post: postData}}
}

export {savePost}
