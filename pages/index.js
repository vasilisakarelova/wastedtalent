import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

import Layout from '../components/layout'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      home: [],
      navigation: {},
      site: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + '')
    .then(response => {
      this.setState({
        home: response.data.home[0],
        navigation: response.data.navigation,
        site: response.data.site
      })
    })
    .catch(function (error) { console.log(error) })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <Layout title={this.state.home.title}>
          <Link href="/management">
            <a>Management Page</a>
          </Link>
        </Layout>
      </div>
    )
  }
}
