import Link from '../helpers/Link'
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import HandleScroll from '../helpers/HandleScroll'
import ProgressiveImage from 'react-progressive-image'
import $ from 'jquery';

export default ({ db }) => {
  const artistsList = []
  db.artists.map((artist,i) => {
    artistsList.push(
      <Link
        key={i}
        to={`/${artist.url}`}
        style={{marginRight: '10px'}}
        className='artist-link'
        >
        <div className='artist-block' key={i}>
          <span className='artist-name'>{artist.title}</span>
          <span className='artist-media content-img'>
            <ProgressiveImage src={artist.intro_image} placeholder={artist.intro_image_thumb}>
              {(src) => <img className='animate' src={src} alt='an image'/>}
            </ProgressiveImage>
          </span>
          <div className='intro-text'><p dangerouslySetInnerHTML={{ __html: artist.intro_text }}></p></div>
        </div>
      </Link>
    );
  })

  return (
    <section className='section-main management-section'>
      <div className='section-track' id='management' onScroll={ ev => HandleScroll(ev.target, 'management')}>
        <div className='content management-content'>
          <div className='content-short'>
              <nobr><h1 className='title management-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1></nobr>
            <div className='intro management-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='artists-container'>{artistsList}</div>
          </div>
        </div>
        <div className='content management-content is-clone'>
          <div className='content-short'>
              <nobr><h1 className='title management-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1></nobr>
            <div className='intro management-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='artists-container'>{artistsList}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
