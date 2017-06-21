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
      const page = response.data.publishing[0]
      this.setState({ page })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <section className='section publishing-section'>
        <style jsx>{`
          .publishing-section {
            background: grey;
            color: white;
          }
        `}</style>
        <div className='section-track'>
          <div className='content publishing-content'>
            <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: this.state.page.title }}></h1>
            <div className='publishing-intro' dangerouslySetInnerHTML={{ __html: this.state.page.headline }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: this.state.page.text }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: this.state.page.p_content }}></div>
          </div>
        </div>
      </section>
    )
  }
}
