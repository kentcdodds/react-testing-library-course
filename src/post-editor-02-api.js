import React from 'react'
import {savePost} from './api'

class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: this.props.user.id,
    }
    this.setState({isSaving: true})
    savePost(newPost).then(
      () => this.setState({isSaving: false}),
      () => this.setState({isSaving: false}),
    )
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title" />

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" name="content" />

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" name="tags" />

        <button type="submit" disabled={this.state.isSaving}>
          Submit
        </button>
      </form>
    )
  }
}

export {Editor}
