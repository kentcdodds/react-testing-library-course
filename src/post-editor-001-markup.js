import React, {useState} from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

export function Editor({user}) {
  const [disable, setDisable] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setDisable(true)

    // searches for the name prop of the form
    const {title, content, tags} = e.target.elements
    // const title = e.target.elements.titleInput.value
    // const content = e.target.elements.contentInput.value
    // const tags = e.target.elements.tagsInput.value.split(',')
    const newPost = {
      authorId: user.id,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(el => el.trim()),
      date: new Date().toISOString(),
    }
    savePost(newPost)
      .then(() => setRedirect(true))
      .catch(err => {
        // console.error(err)
        setDisable(false)
        setError(err.data.error)
      })
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titleInput">Title</label>
      <input id="titleInput" placeholder="title" name="title" />
      <label htmlFor="contentInput">Content</label>
      <textarea id="contentInput" placeholder="Whats up..." name="content" />
      <label htmlFor="tagsInput">Tags</label>
      <input id="tagsInput" name="tags" />
      <button type="submit" disabled={disable}>
        Submit
      </button>
      {error ? <div role="alert"> {error} </div> : null}
    </form>
  )
}
