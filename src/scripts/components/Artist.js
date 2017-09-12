import React from 'react'
import Draggable from 'react-draggable'
import ProgressiveImage from 'react-progressive-image'
import classes from 'classnames'

import Link from '../helpers/Link'

import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'

import closeBtn from '../../assets/access-denied.png'
import instagramBtn from '../../assets/instagram-logo.png'

const openOptions = (ev) => {
  ev.currentTarget.querySelector('.instagram-post-options-container').style.display = 'block';
}

const hideOptions = (ev) => {
  ev.currentTarget.querySelector('.instagram-post-options-container').style.display = 'none';
}

const closeInstagram = (ev) => {
  const instagramFrame = ev.target.closest('[data-instagram-frame]')
  document.querySelector('[data-instagram-parent]').removeChild(instagramFrame)
}

export default ({ db, logo, artists }) => {
  const artistsList = []
  let posts = artists
  let artistLogo = []

  const gallery = db.main_gallery.map((img,i) => {
    return(
      <span className='content-img' key={i}>
        <ProgressiveImage src={img.src} placeholder={img.thumb}>
          {(src) => <img src={src} className='artist-gallery-item'/>}
        </ProgressiveImage>
      </span>
    )
  })

    if (db.artist_logo) {
      artistLogo.push(<span className='title artist-logo'><img alt='artist logo' src={db.artist_logo} /></span>);
    } else {
      artistLogo.push(<h1 className='title artist-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1>);
    }

    posts.map((artist,i) => {
      artistsList.push(
        <Link
          key={i}
          to={`/${artist.url}`}
          style={{ marginRight: '10px', position: 'relative', display: 'block' }}
          className='artist-link'
          >
          <div className='artist-block' key={i} style={{ margin: 0, padding: 0, borderBottom: 'none' }}>
              <span className='artist-name'>{artist.title}</span>
          </div>
        </Link>
      );
    });
    return (
      <div className='about-artist' data-instagram-parent>
        <Draggable>
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * 33}vw` }} onMouseOver={ ev => openOptions(ev) } onMouseLeave={ ev => hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(-7deg)' }}>
              <img src={db.instagram_img_1} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(-7deg)' }}>
              <div className="instagram-post-options">
                <span className='instagram-post-option' onClick={ev => closeInstagram(ev)}>
                  <img src={closeBtn} />
                </span>
                <a target="_blank" href={db.instagram_link}>
                  <span className='instagram-post-option'>
                    <img src={instagramBtn} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <Draggable>
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * (66 - 33) + 33}vw` }} onMouseOver={ ev => openOptions(ev) } onMouseLeave={ ev => hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(13deg)' }}>
              <img src={db.instagram_img_2} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(13deg)' }}>
              <div className="instagram-post-options">
                <span className='instagram-post-option' onClick={ev => closeInstagram(ev)}>
                  <img src={closeBtn} />
                </span>
                <a target="_blank" href={db.instagram_link}>
                  <span className='instagram-post-option'>
                    <img src={instagramBtn} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <Draggable>
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * (70 - 66) + 66}vw` }} onMouseOver={ ev => openOptions(ev) } onMouseLeave={ ev => hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(-7deg)' }}>
              <img src={db.instagram_img_3} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(-7deg)' }}>
              <div className="instagram-post-options">
                <span className='instagram-post-option' onClick={ev => closeInstagram(ev)}>
                  <img src={closeBtn} />
                </span>
                <a target="_blank" href={db.instagram_link}>
                  <span className='instagram-post-option'>
                    <img src={instagramBtn} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <div className='section about-section secondary' id='artist' style={{ width: '25vw', position: 'absolute', left: 0, top: 0 }}>
          <Link to={`/management`} className='close_icon for-about'></Link>
          <div className='section-track'>
            <div className='content about-content'>
              <div className='content-short'>
                <div className='about-media'>
                  <Link to={`/`}><img className='about-logo animate' src={logo}/></Link>
                </div>
              </div>
              <div className='social-media'>
                <a className='social-link' target='_blank' href={db.facebook_link} ><img className='animate' src={facebook} /></a>
                <a className='social-link' target='_blank' href={db.instagram_link} ><img className='animate' src={instagram} /></a>
                <a className='social-link' target='_blank' href={db.twitter_link} ><img className='animate' src={twitter} /></a>
              </div>
              <div className='booking-info' dangerouslySetInnerHTML={{ __html: db.booking_info }}></div>
              <div className='content-long'>
                {artistsList}
              </div>
            </div>
          </div>
        </div>
        <div className='artist-section'>
          <Link
            to={`/`}
            >
            <div className='logo-title'>
              <img className='logo-img' src={logo}/>
            </div>
          </Link>
          {artistLogo[0]}
          <div className='artist-content'>
            <div className='artist-story' dangerouslySetInnerHTML={{ __html: db.main_text }}></div>
          </div>
          <div className='artist-gallery'>
            { gallery }
          </div>
        </div>
      </div>
    )
}
