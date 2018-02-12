import React from 'react'
import { shallow  } from 'enzyme'
import LoginPage from '../../pages/LoginPage'
import toJson from 'enzyme-to-json'


describe('Login Page',() => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginPage />)
  })
  it('Matches Snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('has the class login-background', () => {
    expect(wrapper.is('.login-background')).toBe(true)
  })
  it('has 2 <TextField/>', () => {
   expect(wrapper.find('TextField')).toHaveLength(2)
  })

  describe('OAuth', () => {
    it('Has 2 <GoogleLogin/> Components', () => {
      expect(wrapper.find('t')).toHaveLength(2)
    })
    it('first Component of GoogleLogin is login with Google', () => {
      expect(wrapper.find('t').at(0).props().buttonText).toEqual('Login With Google')
    })
    it('second Component GoogleLogin is Register with Google', () => {
      expect(wrapper.find('t').at(1).props().buttonText).toEqual('Register With Google')
    })
  })
})