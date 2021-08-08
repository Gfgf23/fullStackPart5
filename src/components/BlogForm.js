import React, { useState } from 'react'


const BlogForm = ({ handleCreateBlog }) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl]= useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title:title,author:author,url:url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>title
        <input
          id='title'
          type="text"
          value ={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>


      <div>author
        <input
          id='author'
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>


      <div>url
        <input
          id='url'
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type='submit'>create new blog</button>
      </div>
    </form>
  )
}

export default BlogForm