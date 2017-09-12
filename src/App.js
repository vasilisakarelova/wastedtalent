import React, { Component } from 'react'
import page from 'page'

import HeaderMobile from 'components/HeaderMobile'
import Wrap from 'components/Wrap'
import Artist from 'components/Artist'
import LoaderImg from 'components/LoaderImg'

import About from 'components/About'
import Management from 'components/Management'
import Publishing from 'components/Publishing'
import Digital from 'components/Digital'

import css from './scss/main.scss'
import DataStore from 'flux/stores/DataStore.js'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobile: (window.innerWidth < 769) ? true : false,
      pages: DataStore.getAll().pages,
      artists: DataStore.getAll().posts,
      container: null,
      artistOpen: false,
      path: null,
      slide: null
    }
  }

  componentDidMount() {
    let randomInt = Math.round(Math.random())
    document.querySelector('#loader-wrapper').style.filter = 'invert(' + randomInt + ')'

    const preloaderItems = [...document.querySelectorAll('[data-preloader-item]')]

    let generateTranslate = (el, e, value) => {
      el.style.transform = `translate(${e.clientX*value}px, ${e.clientY*value}px)`;
    }
    let cumulativeOffset = (element) => {
      var top = 0, left = 0;
      do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while(element);

      return {
        top: top,
        left: left
      };
    };

    document.onmousemove = (event) => {
      preloaderItems.forEach((preloaderItem) => {
        let e = event || window.event;
        let x = (e.pageX - cumulativeOffset(preloaderItem).left - (350 / 2)) * -1 / 100;
        let y = (e.pageY - cumulativeOffset(preloaderItem).top - (350 / 2)) * -1 / 100;

        let matrix = [
          [1, 0, 0, -x * 0.00005],
          [0, 1, 0, -y * 0.00005],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ];

        preloaderItem.style.transform = `matrix3d(${matrix.toString()})`
      })
    }

    document.addEventListener('click', () => {
      document.body.classList.add('loaded')
    })

    setTimeout(function(){
      document.body.classList.add('loaded')
    }, 4000)

    window.addEventListener('resize', ::this.handleResize)

    const self = this
    page.base('/new')
    page('/', (ctx) => {
      self.setState({
        container: <Wrap pages={this.state.pages} artists={this.state.artists} />,
        path: ctx.path,
        artistOpen: false
      })
    })
    page('/about', (ctx) => {
      self.setState({
        slide: <About db={this.state.pages['about'][0]} slide='0' />,
        path: ctx.path,
        artistOpen: false
      })
      if (!this.state.isMobile) page.redirect('/')
    })
    page('/management', (ctx) => {
      self.setState({
        slide: <Management db={this.state.pages['management'][0]} slide='1' />,
        container: null,
        path: ctx.path,
        artistOpen: false
      })
      if (!this.state.isMobile) page.redirect('/')
    })
    page('/publishing', (ctx) => {
      self.setState({
        slide: <Publishing db={this.state.pages['publishing'][0]} slide='2' />,
        path: ctx.path,
        artistOpen: false
      })
      if (!this.state.isMobile) page.redirect('/')
    })
    page('/digital', (ctx) => {
      self.setState({
        slide: <Digital db={this.state.pages['digital'][0]} slide='3' />,
        path: ctx.path,
        artistOpen: false
      })
      if (!this.state.isMobile) page.redirect('/')
    })
    this.state.artists.forEach((artist,idx) => {
      page(`/${artist.url}`, (ctx) => {
        self.setState({
          container: <Artist db={artist} logo={this.state.pages['about'][0].logo} artists={this.state.artists} />,
          path: ctx.path,
          artistOpen: true
        })
      })
    })

    page.start()
  }

  handleResize(ev) {
    this.setState({
      isMobile: (window.innerWidth < 769) ? true : false
    })
    if (!this.state.isMobile && this.state.artistsOpen) page.redirect('/')
  }

  render() {
    let images = []
    const n = 35

    for (let i = 0; i < n; i++) {
      images.push( <LoaderImg key={i} /> )
    }

    return (
      <div className='main-wrapper'>
        <main className='main-container'>
          <div id="loader-wrapper">
            <div id="loader">
              <div id="loader-track">
                { images }
              </div>
            </div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
          </div>
          { (this.state.isMobile) ? <HeaderMobile pages={this.state.pages} path={this.state.path} container={this.state.slide} artistOpen={this.state.artistOpen} /> : null }
          { this.state.container }
        </main>
      </div>
    )
  }
}
