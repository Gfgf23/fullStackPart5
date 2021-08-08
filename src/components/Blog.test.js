import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Make sure that Blog component renders only title and author', () => {
  const newBlog = {
    title:'new title',
    author:'Me',
    likes:0,
    url:'g0jgsd'
  }

  const component = render(
    <Blog blog={newBlog} />
  )

  expect(component.container).toHaveTextContent(
    'new title Me'
  )

})