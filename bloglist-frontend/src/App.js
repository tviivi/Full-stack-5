import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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
      user: null
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

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: ''
        })
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
    const loginForm = () => (
      <div>
        <h2>Log in to application:</h2>

        <form onSubmit={this.login}>
          <div>
            username
    <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
    <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    )

    const allBlogs = () => (
      <div>
        <div>
          <h2>blogs</h2>
          <Notification message={this.state.error} />
          <p>{this.state.user.name} logged in <button onClick={this.logout}>LOGOUT</button></p>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />)}
        </div>

        <div>
          <h2>create new blog</h2>

          <form onSubmit={this.addBlog}>
            <div>
              title <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleBlogChange}
              />
            </div>
            <div>
              author <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleBlogChange}
              />
            </div>
            <div>
              url <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleBlogChange}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </div>
    )

    return (
      <div>
        {this.state.user === null ?
          loginForm() : allBlogs()
        }
      </div>
    )
  }
}

export default App;