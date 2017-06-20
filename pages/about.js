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
      const page = response.data.about[0]
      this.setState({ page })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <section className='section about-section'>
        <div className='about-content'>
          <div className='about-intro' dangerouslySetInnerHTML={{ __html: this.state.page.abouttext }}></div>
          <div className='about-text' dangerouslySetInnerHTML={{ __html: this.state.page.impressumtext }}></div>
        </div>
      </section>
    )
  }
}
