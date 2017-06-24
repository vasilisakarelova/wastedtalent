import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Digital extends React.Component {
  render() {
    let page = DataStore.getAll().pages.digital[0];

    return (
      <section className='section digital-section'>
        <div className='section-track'>
          <div className='content digital-content'>
            <div className='content-short'>
              <Link
                to={`/~vasilisakarelova/wastedtalent/build/${page.url}`}
                className='section-link'
                data-section-link
                onClick={ev => setSectionLink(ev)}
                >
                  <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
              </Link>
              <div className='intro digital-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
            </div>
            <div className='content-long'>
              <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
              <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.d_content }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Digital;
