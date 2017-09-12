import React, { Component } from 'react'
import classes from 'classnames'

import Link from '../helpers/Link'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: true,
      container: null,
      path: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.container) {
      this.setState({
        menu: false,
        container: nextProps.container,
        path: nextProps.path.replace('/', '')
      })
    }
    if(nextProps.path == '/') {
      this.setState({
        menu: true
      })
    }
  }

  componentDidUpdate() {
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
          img.style.width = 'auto'
        }
      }
    })
  }

  render() {
    let menu = []

    Object.keys(this.props.pages).forEach((id, key) => {
      if (id == 'about') {
        menu.push(
          <section className='section-head about-section' key={key}>
            <Link to='/about'><img className='animate' src={this.props.pages[id][0].logo} /></Link>
          </section>
        )
      } else {
          menu.push(
            <section className={`section-head ${id}-section`} key={key}>
              <Link to={`/${id}`} className='section-head-link'>
                <div className='section-container'>
                  <nobr>
                    <h1 className='section-headline'>{this.props.pages[id][0].title}</h1>
                  </nobr>
                  <div className='section-intro'>{this.props.pages[id][0].headline}</div>
                </div>
              </Link>
            </section>
        )
      }
    })

    let nav = {}
    if (this.state.path !== '' ) {
       nav = {
        'about': <div><Link dir='right' to='/management' className={`arrow arrow-right for-${this.state.path}`}></Link></div>,
        'management': <div><Link dir='left' to='/about' className={`arrow arrow-left for-${this.state.path}`}></Link><Link dir='right' to='/publishing' className={`arrow arrow-right for-${this.state.path}`}></Link></div>,
        'publishing': <div><Link dir='left' to='/management' className={`arrow arrow-left for-${this.state.path}`}></Link><Link dir='right' to='/digital' className={`arrow arrow-right for-${this.state.path}`}></Link></div>,
        'digital': <div><Link dir='left' to='/publishing' className={`arrow arrow-left for-${this.state.path}`}></Link></div>
      }
    }

    return (
      <div className={classes({
        'section-track-mobile': true,
        'is-menu': this.state.menu,
        'is-container ': !this.state.menu,
        'is-hidden': this.props.artistOpen
      })}>
        <Link to='/' className={`close_icon for-${this.state.path}`}></Link>
        { (this.state.menu) ? menu : this.state.container }
        { (this.state.path !== '') ? nav[this.state.path] : null }
      </div>
    )
  }
}
