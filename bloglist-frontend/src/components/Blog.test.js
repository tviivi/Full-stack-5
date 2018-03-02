import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'plöplö',
            author: 'Testityyppi',
            url: 'www.testi.fi',
            likes: 26
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        const nameDiv = blogComponent.find('.content')
        console.log(nameDiv.debug())
        expect(nameDiv.text()).toContain(blog.title, blog.author)

        const mockHandler = jest.fn()
      
        const otherBlogComponent = shallow(
          <Blog
            blog={blog}
            onClick={mockHandler}
          />
        )
        const button = otherBlogComponent.find('button')

        nameDiv.simulate('click')
        const contentDiv = otherBlogComponent.find('.othercontent')
        console.log(contentDiv.debug())
        expect(contentDiv.text()).toContain(blog.title, blog.author, blog.url, blog.likes)
      })
})