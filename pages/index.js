import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

import Layout from '../components/layout'
import About from './about'
import Management from './management'
import Publishing from './publishing'
import Digital from './digital'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      home: [],
      about: [],
      management: [],
      publishing: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + '')
    .then(response => {
      this.setState({
        home: response.data.home[0],
        about: response.data.about[0],
        management: response.data.management[0],
        publishing: response.data.publishing[0],
      })
    })
    .catch(function (error) { console.log(error) })
  }

  render() {
    return (
      <div className='main-wrapper'>
        <Head>
          <title>{this.state.home.title}</title>
        </Head>
        <main className='main-container'>
          <About />
          <Management />
          <Publishing />
          <Digital />
        </main>
      </div>
    )
  }
}
