import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      error: null,
      username: '',
      password: '',
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  notify = (error) => {
    this.setState({ error })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user.name
    }
    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          user: ''
        })
        this.notify(`a new blog with a title '${blogObject.title}' and a user ${blogObject.user} added`)
      })
  }

  handleBlogChange = (event) => {
    if (event.target.name === 'title') {
      this.setState({ title: event.target.value })
    } if (event.target.name === 'author') {
      this.setState({ author: event.target.value })
    } else if (event.target.name === 'url') {
      this.setState({ url: event.target.value })
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      this.notify(`wrong username or password`)
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>LOGIN</button>
          </div>
          <div style={showWhenVisible}>
            <Notification message={this.state.error} />
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>CANCEL</button>
          </div>
        </div>
      )
    }

    const blogForm = () => (
      <Togglable buttonLabel="create a new blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleBlogChange}
        />
      </Togglable>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() :
          <div>

            <h2>blogs</h2>
            <Notification message={this.state.error} />
            <p>{this.state.user.name} logged in <button onClick={this.logout}>LOGOUT</button></p>
            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog}/>)}

            <div>{blogForm()}</div>
          </div>
        }
      </div>
    )
  }
}

export default App;