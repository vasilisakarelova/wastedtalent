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
    }
  }

  componentDidMount() {
    axios.get(API_URL + '')
    .then(response => {
      const page = response.data.digital[0]
      this.setState({ page })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <section className='section digital-section'>
        <Layout title={this.state.page.title}>
          <div className='digital-content'>
            <div className='digital-intro' dangerouslySetInnerHTML={{ __html: this.state.page.headline }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: this.state.page.text }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: this.state.page.d_content }}></div>
          </div>
        </Layout>
      </section>
    )
  }
}
