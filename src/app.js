import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {submitForm} from './api'

const MultiPageForm = React.createContext()

function MultiPageFormProvider({initialValues = {}, ...props}) {
  const [initState] = React.useState(initialValues)
  const [form, setFormValues] = React.useReducer(
    (s, a) => ({...s, ...a}),
    initState,
  )
  const resetForm = () => setFormValues(initialValues)
  return (
    <MultiPageForm.Provider
      value={{form, setFormValues, resetForm}}
      {...props}
    />
  )
}

function useMultiPageForm() {
  const context = React.useContext(MultiPageForm)
  if (!context) {
    throw new Error(
      'useMultiPageForm must be used within a MiltiPageFormProvider',
    )
  }
  return context
}

function Main() {
  return (
    <>
      <h1>Welcome home</h1>
      <Link to="/page-1">Fill out the form</Link>
    </>
  )
}

function Page1({history}) {
  const {form, setFormValues} = useMultiPageForm()
  return (
    <>
      <h2>Page 1</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          history.push('/page-2')
        }}
      >
        <label htmlFor="food">Favorite Food</label>
        <input
          id="food"
          value={form.food}
          onChange={(e) => setFormValues({food: e.target.value})}
        />
      </form>
      <Link to="/">Go Home</Link> | <Link to="/page-2">Next</Link>
    </>
  )
}

function Page2({history}) {
  const {form, setFormValues} = useMultiPageForm()
  return (
    <>
      <h2>Page 2</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          history.push('/confirm')
        }}
      >
        <label htmlFor="drink">Favorite Drink</label>
        <input
          id="drink"
          value={form.drink}
          onChange={(e) => setFormValues({drink: e.target.value})}
        />
      </form>
      <Link to="/page-1">Go Back</Link> | <Link to="/confirm">Review</Link>
    </>
  )
}

function Confirm({history}) {
  const {form, resetForm} = useMultiPageForm()
  function handleConfirmClick() {
    submitForm(form).then(
      () => {
        resetForm()
        history.push('/success')
      },
      (error) => {
        history.push('/error', {state: {error}})
      },
    )
  }
  return (
    <>
      <h2>Confirm</h2>
      <div>
        <strong>Please confirm your choices</strong>
      </div>
      <div>
        <strong id="food-label">Favorite Food</strong>:{' '}
        <span aria-labelledby="food-label">{form.food}</span>
      </div>
      <div>
        <strong id="drink-label">Favorite Drink</strong>:{' '}
        <span aria-labelledby="drink-label">{form.drink}</span>
      </div>
      <Link to="/page-2">Go Back</Link> |{' '}
      <button onClick={handleConfirmClick}>Confirm</button>
    </>
  )
}

function Success() {
  return (
    <>
      <h2>Congrats. You did it.</h2>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </>
  )
}

function Error({
  location: {
    state: {error},
  },
}) {
  return (
    <>
      <div>Oh no. There was an error.</div>
      <pre>{error.message}</pre>
      <Link to="/">Go Home</Link>
      <Link to="/confirm">Try again</Link>
    </>
  )
}

function App() {
  return (
    <MultiPageFormProvider initialValues={{food: '', drink: ''}}>
      <Router>
        <Switch>
          <Route path="/page-1" component={Page1} />
          <Route path="/page-2" component={Page2} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/success" component={Success} />
          <Route path="/error" component={Error} />
          <Route component={Main} />
        </Switch>
      </Router>
    </MultiPageFormProvider>
  )
}

export default App

/*
eslint
  react/no-adjacent-inline-elements: "off",
*/
