import React, {useState} from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

export function Editor({user}) {
  const [disable, setDisable] = useState(false)
  const [redirect, setRedirect] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setDisable(true)
    //savePost(message)
    const {title, content, tags} = e.target.elements
    // const title = e.target.elements.titleInput.value
    // const content = e.target.elements.contentInput.value
    // const tags = e.target.elements.tagsInput.value.split(',')
    savePost({
      authorId: user.id,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((el) => el.trim()),
    }).then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titleInput">Title</label>
      <input
        id="titleInput"
        placeholder="title"
        name="title"
        //onChange={(e) => setTitle(e.target.value)}
        //value={title}
      />

      <label htmlFor="contentInput">Content</label>
      <textarea
        id="contentInput"
        placeholder="Whats up..."
        name="content"
        //onChange={(e) => setContent(e.target.value)}
        //value={content}
      />

      <label htmlFor="tagsInput">Tags</label>
      <input
        id="tagsInput"
        name="tags"
        //onChange={(e) => setTags(e.target.value)}
        //value={tags}
      />

      <button type="submit" disabled={disable}>
        Submit
      </button>
    </form>
  )
}
