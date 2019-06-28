import React from 'react'
import { mount } from 'enzyme'
import MarkerHandler from './index'

describe('<MarkerHanlder />', () => {
  it('Should renders a marker', () => {
    const validMarker = {
      type: 'ad',
      start: 0,
      duration: 10,
      content: 'Do you have an angry mom?',
      link: 'https://en.wikipedia.org/wiki/Angry_Mom'
    }

    const validTime = 1

    const handler = mount(
      <MarkerHandler
        markers={[validMarker]}
        currentTime={validTime}
      />
    )

    const expectedContent = <p>{validMarker.content}</p>

    expect(handler.contains(expectedContent)).toEqual(true)
  })

  it('Should not render a marker before the start time', () => {
    const validMarker = {
      type: 'ad',
      start: 4,
      duration: 10,
      content: 'Do you have an angry mom?',
      link: 'https://en.wikipedia.org/wiki/Angry_Mom'
    }

    const validTime = 2

    const handler = mount(
      <MarkerHandler
        markers={[validMarker]}
        currentTime={validTime}
      />
    )

    const expectedContent = <p>{validMarker.content}</p>

    expect(handler.contains(expectedContent)).toEqual(false)
  })

  it('Should not render a marker after the start time + duration', () => {
    const inValidMarker = {
      type: 'ad',
      start: 4,
      duration: 10,
      content: 'Do you have an angry mom?',
      link: 'https://en.wikipedia.org/wiki/Angry_Mom'
    }

    const validTime = 15

    const handler = mount(
      <MarkerHandler
        markers={[inValidMarker]}
        currentTime={validTime}
      />
    )

    const expectedContent = <p>{inValidMarker.content}</p>

    expect(handler.contains(expectedContent)).toEqual(false)
  })

  it('Should not render a marker with type not of ["text", "image", "ad"]', () => {
    const inValidMarker = {
      type: 'morseCode',
      start: 1,
      duration: 100,
      content: 'Do you have an angry mom?',
      link: 'https://en.wikipedia.org/wiki/Angry_Mom'
    }

    const validTime = 15

    const handler = mount(
      <MarkerHandler
        markers={[inValidMarker]}
        currentTime={validTime}
      />
    )

    expect(handler.find('div.MarkerHandler').children()).toHaveLength(0)
  })
})