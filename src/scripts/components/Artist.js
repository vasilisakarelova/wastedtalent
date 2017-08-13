import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';
import DataStore from 'flux/stores/DataStore.js'
import DataActions from 'flux/actions/DataActions.js'
import ProgressiveImage from 'react-progressive-image'

import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';

import Draggable from 'react-draggable';

import $ from 'jquery';

class Artist extends React.Component {
  constructor(...args) {
    super(...args);
    this.state= { show: false }
  }

  componentDidMount() {
    document.querySelector('[data-slider]').style.display = 'none';
    document.querySelectorAll('.animate').forEach((img) => {
      img.addEventListener('mouseleave', () => {
        img.classList.add('strobe')
      })
      img.addEventListener('animationend', () => {
        img.classList.remove('strobe')
      })
    })
  }

  handleLogoClick() {
    document.querySelector('[data-slider]').style.display = 'flex';
  }

  componentWillUnmount() {
    document.querySelector('[data-slider]').style.display = 'flex';
  }

  componentWillEnter (callback) {
    console.log('enter')
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }

  openOptions(ev) {
    ev.currentTarget.querySelector('.instagram-post-options-container').style.display = 'block';
  }

  hideOptions(ev) {
    ev.currentTarget.querySelector('.instagram-post-options-container').style.display = 'none';
  }

  closeInstagram() {
    const instagramFrame = document.querySelector('[data-instagram-frame]');
    document.querySelector('[data-instagram-parent]').removeChild(instagramFrame);
  }

  render() {
    let logoSrc = DataStore.getAll().pages.about[0].logo;

    const artistsList = [];
    let page = DataStore.getAll().pages.management[0];
    let posts = DataStore.getAll().posts;
    let logo = DataStore.getAll().pages.about[0].logo;
    let artistLogo = [];
    const filter = this.props.match.path.split('/').pop();
    const artist = posts.filter(post => {
      if(post['url'] == filter) {
        return post;
      }
    });
    const gallery = artist[0].main_gallery.map((img,i) => {
      return(
        <span className='content-img' key={i}>
          <ProgressiveImage src={img.src} placeholder={img.thumb}>
            {(src) => <img src={src} className='artist-gallery-item'/>}
          </ProgressiveImage>
        </span>
      );
    });
    const artistLogoSrc = artist[0].artist_logo;
    const instagramImg = artist[0].artist_img;

    if (artistLogoSrc) {
      artistLogo.push(<span className='title artist-logo'><img alt='artist logo' src={artistLogoSrc} /></span>);
    } else {
      artistLogo.push(<h1 className='title artist-title' dangerouslySetInnerHTML={{ __html: artist[0].title }}></h1>);
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
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * 33}vw` }} onMouseOver={ ev => this.openOptions(ev) } onMouseLeave={ ev => this.hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(-7deg)' }}>
              <img src={artist[0].instagram_img_1} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(-7deg)' }}>
              <div className="instagram-post-options">
                <span className="instagram-post-option js--close-instagram-post" onClick={this.closeInstagram}>
                  <i className="fa fa-times fa-2x"></i>
                </span>
                <a target="_blank" href={artist[0].instagram_link}>
                  <span className="instagram-post-option">
                    <i className="fa fa-instagram fa-2x"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <Draggable>
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * (66 - 33) + 33}vw` }} onMouseOver={ ev => this.openOptions(ev) } onMouseLeave={ ev => this.hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(13deg)' }}>
              <img src={artist[0].instagram_img_2} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(13deg)' }}>
              <div className="instagram-post-options">
                <span className="instagram-post-option js--close-instagram-post" onClick={this.closeInstagram}>
                  <i className="fa fa-times fa-2x"></i>
                </span>
                <a target="_blank" href={artist[0].instagram_link}>
                  <span className="instagram-post-option">
                    <i className="fa fa-instagram fa-2x"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <Draggable>
          <div className='box' data-instagram-frame style={{position: 'absolute', top: `${Math.random() * (60 - 10) + 10}vh`, left: `${Math.random() * (90 - 66) + 66}vw` }} onMouseOver={ ev => this.openOptions(ev) } onMouseLeave={ ev => this.hideOptions(ev) }>
            <div className="instagram-post-image" style={{ transform: 'rotate(-7deg)' }}>
              <img src={artist[0].instagram_img_3} />
            </div>
            <div className="instagram-post-options-container" style={{ transform: 'rotate(-7deg)' }}>
              <div className="instagram-post-options">
                <span className="instagram-post-option js--close-instagram-post" onClick={this.closeInstagram}>
                  <i className="fa fa-times fa-2x"></i>
                </span>
                <a target="_blank" href={artist[0].instagram_link}>
                  <span className="instagram-post-option">
                    <i className="fa fa-instagram fa-2x"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Draggable>
        <div className='section about-section secondary' id='artist' style={{ width: '25vw', position: 'absolute', left: 0, top: 0 }}>
          <div className='section-track'>
            <div className='content about-content'>
              <div className='content-short'>
                <div className='about-media' onClick={this.handleLogoClick}>
                  <Link to={`/`}><img className='about-logo animate' src={logoSrc}/></Link>
                </div>
              </div>
              <div className='social-media'>
                <a className='social-link' target='_blank' href={artist[0].facebook_link} ><img src={facebook} /></a>
                <a className='social-link' target='_blank' href={artist[0].instagram_link} ><img src={instagram} /></a>
                <a className='social-link' target='_blank' href={artist[0].twitter_link} ><img src={twitter} /></a>
              </div>
              <div className='booking-info' dangerouslySetInnerHTML={{ __html: artist[0].booking_info }}></div>
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
            <div className='artist-story' dangerouslySetInnerHTML={{ __html: artist[0].main_text }}></div>
          </div>
          <div className='artist-gallery'>
            { gallery }
          </div>
        </div>
    </div>
    );
  }
}

export default Artist;
