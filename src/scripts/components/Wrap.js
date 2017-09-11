import React, { Component } from 'react'
import classes from 'classnames'

import About from './About'
import Management from './Management'
import Publishing from './Publishing'
import Digital from './Digital'

export default class extends Component {
  componentDidMount() {
    document.querySelectorAll('.inline-img img').forEach((img) => {
      img.onload = function () {
        if (img.naturalHeight > 300) {
          img.style.height = 'auto'
          img.style.width = '100%'
        } else {
          img.style.height = '1.4em';
        }
      }
    })

    document.querySelectorAll('#digital .content-img img').forEach((img) => {
      img.onload = function () {
        if (img.naturalWidth > (img.naturalHeight * 4)) {
          img.style.height = 'auto'
          img.style.width = '80%'
        }
      }
    })

    document.querySelectorAll('.animate').forEach((img) => {
      img.addEventListener('mouseleave', () => {
        img.classList.add('strobe')
      })
      img.addEventListener('animationend', () => {
        img.classList.remove('strobe')
      })
    })
  }

  render() {
    let sections = []

    const views = {
      'about': <About db={this.props.pages['about'][0]} key='0' />,
      'management': <Management db={this.props.pages['management'][0]} key='1' />,
      'publishing': <Publishing db={this.props.pages['publishing'][0]} key='2' />,
      'digital': <Digital db={this.props.pages['digital'][0]} key='3' />
    }

    Object.keys(this.props.pages).forEach((id, key) => {
      sections.push(
        views[id]
      )
    })

    return (
      <div className='sections-wrapper'>
        {sections}
      </div>
    )
  }
}
