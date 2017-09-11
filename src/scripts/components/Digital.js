import Link from '../helpers/Link'
import HandleScroll from '../helpers/HandleScroll'
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import $ from 'jquery'

export default ({ db }) => {
  return (
    <section className='section-main digital-section'>
      <div className='section-track' id='digital' onScroll={ ev => HandleScroll(ev.target, 'digital')}>
        <div className='content digital-content'>
          <div className='content-short'>
            <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1>
            <div className='intro digital-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: db.d_content.replace(/<span class="content-img"><a/g, '<span class="content-img"><a class="animate"') }}></div>
          </div>
        </div>
        <div className='content digital-content is-clone'>
          <div className='content-short'>
            <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1>
            <div className='intro digital-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: db.d_content.replace(/<span class="content-img"><a/g, '<span class="content-img"><a class="animate"') }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
