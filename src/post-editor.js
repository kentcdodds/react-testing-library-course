import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

class Editor extends Component {
  static defaultProps = {savePost}
  state = {isSaving: false, error: null, redirect: false}
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
    this.props
      .savePost(newPost)
      .then(
        () => this.setState({isSaving: false, redirect: true}),
        response =>
          this.setState({isSaving: false, error: response.data.error}),
      )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title-input">Title</label>
          <input id="title-input" placeholder="Title" name="title" />
          <label htmlFor="content-input">Content</label>
          <textarea id="content-input" placeholder="Content" name="content" />
          <label htmlFor="tags-input">Tags</label>
          <input id="tags-input" placeholder="tags" name="tags" />
          <button type="submit" disabled={this.state.isSaving}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export {Editor}
