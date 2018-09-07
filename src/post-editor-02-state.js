import React from 'react'

class Editor extends React.Component {
  state = {isSaving: true}
  render() {
    return (
      <form>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" />

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" />

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" />

        <button type="submit" disabled={this.state.isSaving}>
          Submit
        </button>
      </form>
    )
  }
}

export {Editor}
