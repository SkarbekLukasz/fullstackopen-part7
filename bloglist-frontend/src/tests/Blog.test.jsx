import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Some title',
    author: 'Some author',
    likes: 1,
    url: 'http://localhost:3003'
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('Some title Some author')

  const details = container.querySelector('.blogDetails')
  expect(details).toBeNull
})

test('renders blog url and likes', async () => {
  const blog = {
    title: 'Some title',
    author: 'Some author',
    likes: 1,
    url: 'http://localhost:3003',
    user: {
      name: 'Pabloo',
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const details = screen.getByText('http://localhost:3003')
  expect(details).toBeDefined
})

test('clicking like button 2 times gives 2 likes', async () => {
  const blog = {
    title: 'Some title',
    author: 'Some author',
    likes: 1,
    url: 'http://localhost:3003',
    user: {
      name: 'Pabloo',
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateLikes={mockHandler}/>)
  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)


  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})