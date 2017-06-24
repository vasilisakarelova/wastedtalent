import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Publishing extends React.Component {
  render() {
    let page = DataStore.getAll().pages.publishing[0];

    return (
      <section className='section publishing-section'>
        <div className='section-track'>
          <div className='content publishing-content'>
            <div className='content-short'>
              <Link
                to={`/~vasilisakarelova/wastedtalent/build/${page.url}`}
                className='section-link'
                data-section-link
                onClick={ev => setSectionLink(ev)}
                >
                  <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
              </Link>
              <div className='intro publishing-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
            </div>
            <div className='content-long'>
              <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
              <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.p_content }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Publishing;
