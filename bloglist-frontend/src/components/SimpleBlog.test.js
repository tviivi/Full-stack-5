import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
        const blog = {
            title: 'Niin hyvää testiä',
            author: 'Testaaja',
            likes: 23
        }
        console.log(blog)

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        console.log(simpleBlogComponent.debug())

        const contentDiv = simpleBlogComponent.find('.content')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(contentDiv.text()).toContain(blog.title, blog.author)
        console.log(contentDiv.debug())
        expect(likesDiv.text()).toContain(blog.likes)

    })
})