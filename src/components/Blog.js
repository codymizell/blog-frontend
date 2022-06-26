import { useState, } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: 2
  }

  const showInfo = () => {
    setVisible(!visible)
  }

  const showWhenVisible = {
    display: visible ? '' : 'none',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: 20,
  }
  const btnShowWhenVisible = {
    display: visible ? '' : 'none',
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const handleLikes = () => {
    const copy = { ...blog, likes: blog.likes += 1 }
    delete copy.id
    props.handleLikes(copy, blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove the blog '${blog.title}?`)) {
      props.deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>
        {blog.title + ' - ' + blog.author + ' '}
        <button onClick={showInfo} style={hideWhenVisible}>view</button>
        <button onClick={showInfo} style={btnShowWhenVisible}>close</button>
      </div>
      <ol style={showWhenVisible}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>likes: {blog.likes} <button onClick={handleLikes}>like</button></li>
        <li>{blog.user.name}</li>
        <button onClick={handleDelete} style={removeStyle}>remove</button>
      </ol>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog


