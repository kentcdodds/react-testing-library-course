import React from 'react'

class FavoriteNumber extends React.Component {
  static defaultProps = {min: 1, max: 9}

  state = {number: 0, numberEntered: false}

  handleChange = event => {
    this.setState({numberEntered: true, number: Number(event.target.value)})
  }

  render() {
    const {number, numberEntered} = this.state
    const {min, max} = this.props
    const isValid = !numberEntered || (number >= min && number <= max)
    return (
      <div>
        <label>
          {' '}
          Remember me <input type="checkbox" />
        </label>
        <label htmlFor="favorite-number">Favorite Number</label>
        <input
          id="favorite-number"
          type="number"
          value={number}
          onChange={this.handleChange}
        />
        {isValid ? null : (
          <div data-testid="error-message">The number is invalid</div>
        )}
      </div>
    )
  }
}

export {FavoriteNumber}
