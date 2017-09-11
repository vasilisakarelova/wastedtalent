import Link from '../helpers/Link'
import DataStore from 'flux/stores/DataStore.js'
import HandleScroll from '../helpers/HandleScroll'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import $ from 'jquery';

export default ({ db }) => {
  return (
    <section className='section-main about-section'>
      <div className='section-track' id='about' onScroll={ ev => HandleScroll(ev.target, 'about')}>
        <div className='content about-content'>
          <div className='content-short'>
            <div className='about-media'>
              <Link to={`/`}><img className='about-logo animate' src={db.logo}/></Link>
            </div>
          </div>
          <div className='content-long'>
            <div className='about-intro' dangerouslySetInnerHTML={{ __html: db.abouttext }}></div>
            <div className='about-text' dangerouslySetInnerHTML={{ __html: db.impressumtext.replace(/<span class="content-img"><a/g, '<span class="content-img"><a class="animate"') }}></div>
          </div>
        </div>
        <div className='content about-content is-clone'>
          <div className='content-short'>
            <div className='about-media'>
              <Link to={`/`}><img className='about-logo animate' src={db.logo}/></Link>
            </div>
          </div>
          <div className='content-long'>
            <div className='about-intro' dangerouslySetInnerHTML={{ __html: db.abouttext }}></div>
            <div className='about-text' dangerouslySetInnerHTML={{ __html: db.impressumtext.replace(/<span class="content-img"><a/g, '<span class="content-img"><a class="animate"') }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
