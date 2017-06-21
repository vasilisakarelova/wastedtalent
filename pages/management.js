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
    const artistsList = [];
    const artistsArray = [...this.state.artists];
    artistsArray.map(artist => {
      console.log(artist);
      artistsList.push(
        <div className='artist-block'>
          <style jsx>{`
            .artist-block {
              position: relative;
              display: block;
              margin: 1em 0 2em;
            }

            .artist-media {
              display: block;
              margin: 10px 0 40px 0;
            }

            .artist-intro-image {
              width: 100%;
              max-width: 100%;
              height: auto !important;
            }
            `}</style>
          <span className='artist-name'>{artist.title}</span>
          <span className='artist-media'>
            <img className='artist-intro-image' src={artist.intro_image}/>
          </span>
          <div>{artist.intro_text}</div>
        </div>
      );
    });

    return (
      <section className='section management-section'>
        <style jsx>{`
          .management-section {
            background: black;
            color: white;
          }
          `}</style>
        <div className='section-track'>
          <div className='content management-content'>
            <h1 className='title management-title' dangerouslySetInnerHTML={{ __html: this.state.page.title }}></h1>
            <div className='management-intro' dangerouslySetInnerHTML={{ __html: this.state.page.headline }}></div>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: this.state.page.text }}></div>
            <div className='artists-container'>{artistsList}</div>
          </div>
        </div>
      </section>
    )
  }
}
