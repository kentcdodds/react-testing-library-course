import React, {Component} from 'react'

class Editor extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="title-input">Title</label>
          <input id="title-input" name="title" />
          <label htmlFor="content-input">Content</label>
          <textarea id="content-input" name="content" />
          <label htmlFor="tags-input">Tags</label>
          <input id="tags-input" name="tags" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export {Editor}
