import Link from '../helpers/Link'
import DataStore from 'flux/stores/DataStore.js'
import HandleScroll from '../helpers/HandleScroll'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import $ from 'jquery';

export default ({ db }) => {
  return (
    <section className='section-main publishing-section'>
      <div className='section-track' id='publishing' onScroll={ ev => HandleScroll(ev.target, 'publishing')}>
        <div className='content publishing-content'>
          <div className='content-short'>
            <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1>
            <div className='intro publishing-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: db.p_content.replace(/<span class="content-img"><a/g, '<span class="inline-img"><a class="animate"') }}></div>
          </div>
        </div>
        <div className='content publishing-content is-clone'>
          <div className='content-short'>
            <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: db.title }}></h1>
            <div className='intro publishing-intro'><p>{db.headline}</p></div>
          </div>
          <div className='content-long'>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: db.text }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: db.p_content.replace(/<span class="content-img"><a/g, '<span class="inline-img"><a class="animate"') }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
