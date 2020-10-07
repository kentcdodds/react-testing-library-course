function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`/${endpoint}`, config).then(async (response) => {
    const responseData = await response.json()
    if (response.ok) {
      return responseData
    } else {
      return Promise.reject(responseData)
    }
  })
}

const savePost = (postData) => client(`post/${postData.id}`, {data: postData})
const loadGreeting = (subject) => client(`greeting`, {data: {subject}})
const reportError = (data) => client(`error`, {data})
const submitForm = (data) => client(`form`, {data})

export {savePost, loadGreeting, reportError, submitForm}
