import React, {Component} from 'react'

class Editor extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title-input">Title</label>
          <input id="title-input" placeholder="Title" name="title" />
          <label htmlFor="content-input">Content</label>
          <textarea id="content-input" placeholder="Content" name="content" />
          <label htmlFor="tags-input">Tags</label>
          <input id="tags-input" placeholder="tags" name="tags" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export {Editor}
