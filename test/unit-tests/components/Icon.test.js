/* global describe, it, beforeEach, expect, jest */
/* eslint-disable no-unused-vars */

import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import iconsMap from '../../../app/fixtures/icons-map.json'
import Icon from '../../../app/components/Icon'

Enzyme.configure({adapter: new Adapter()})

jest.mock('../../../app/fixtures/icons-map.json', () => {
	return {
		100: {
			icon: 'rain'
		},
		700: {
			icon: 'sun'
		},
		900: {
			icon: 'moon'
		}
	}
})

describe('Icon', () => {
	let icon

	beforeEach(() => {
		icon = shallow(<Icon code="100" />)
	})

	describe('should set correct class names and html tag for root element', () => {
		it('should set code class with day prefix if code < 699', () => {
			expect(icon.props().className).toEqual('wi wi-day-rain')
			expect(icon.type()).toEqual('i')
		})
	
		it('should set code class without day prefix if code > 699 && code < 800', () => {
			icon = shallow(<Icon code="700" />)
	
			expect(icon.props().className).toEqual('wi wi-sun')
		})

		it('should set code class without day prefix if code > 899 && code < 1000', () => {
			icon = shallow(<Icon code="900" />)
	
			expect(icon.props().className).toEqual('wi wi-moon')
		})

		it('should return null if code is not in the iconsMap', () => {
			icon = shallow(<Icon code="1" />)

			expect(icon.html()).toEqual(null)
		})
	})
})
