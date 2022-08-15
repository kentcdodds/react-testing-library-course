import React, {useState} from 'react'

export function Editor() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [disable, setDisable] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setDisable(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        placeholder="Whats up..."
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />

      <label htmlFor="tags">Tags</label>
      <input id="tags" onChange={(e) => setTags(e.target.value)} value={tags} />

      <button type="submit" disabled={disable}>
        Submit
      </button>
    </form>
  )
}
