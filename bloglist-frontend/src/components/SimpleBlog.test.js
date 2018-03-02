import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
        const blog = {
            title: 'Niin hyvää testiä',
            author: 'Testaaja',
            likes: 23
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)

        const contentDiv = simpleBlogComponent.find('.content')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(contentDiv.text()).toContain(blog.title, blog.author)
        expect(likesDiv.text()).toContain(blog.likes)

    })

    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            title: 'Jee testi jee',
            author: 'Testaaja2',
            likes: 21
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <SimpleBlog
            blog={blog}
            onClick={mockHandler}
          />
        )
      
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(2)
      })
})