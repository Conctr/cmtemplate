import React from 'react'
import { shallow  } from 'enzyme'
import LoginPage from '../../pages/LoginPage'
import toJson from 'enzyme-to-json'

describe('CommentList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginPage />)
  })
  it('hello world', () => {
    console.log('hello')
  })
})
