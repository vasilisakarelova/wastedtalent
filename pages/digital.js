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
      const page = response.data.digital[0];
      this.setState({ page })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    console.log(this.state.page);
    return (
      <div>
        <Head>
          <title>{this.state.page.title}</title>
        </Head>
        <Layout title={this.state.page.title}>
          <Link href="/">
            <a>Home Page</a>
          </Link>
          <div className='management-content'>
            <div className='management-intro' dangerouslySetInnerHTML={{ __html: this.state.page.intro }}></div>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: this.state.page.text }}></div>
          </div>
        </Layout>
      </div>
    )
  }
}
