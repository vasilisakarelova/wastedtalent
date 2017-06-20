import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

import Layout from '../components/layout'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      page: [],
      artists: [],
    }
  }

  componentDidMount() {
    axios.get(API_URL + '')
    .then(response => {
      const page = response.data.management[0]
      const artists = response.data.artists
      this.setState({ page, artists })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <section className='section management-section'>
        <Layout title={this.state.page.title}>
          <div className='management-content'>
            <div className='management-intro' dangerouslySetInnerHTML={{ __html: this.state.page.headline }}></div>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: this.state.page.text }}></div>
          </div>
        </Layout>
      </section>
    )
  }
}
