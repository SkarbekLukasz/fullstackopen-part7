import NewBlog from '../components/NewBlog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('properly submits new blog form', async () => {

  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlog createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('URL')
  const submit = screen.getByText('create')

  await user.type(titleInput, 'New title')
  await user.type(authorInput, 'New author')
  await user.type(urlInput, 'New URL')
  await user.click(submit)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New title')
})