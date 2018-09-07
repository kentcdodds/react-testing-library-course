import React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

class Editor extends React.Component {
  state = {isSaving: false, redirect: false}
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: this.props.user.id,
    }
    this.setState({isSaving: true})
    savePost(newPost).then(
      () => this.setState({isSaving: false, redirect: true}),
      () => this.setState({isSaving: false}),
    )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
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
