import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class About extends React.Component {
  render() {
    //let pageData = DataStore.getPageBySlug('abou t');
    let page = DataStore.getAll().pages.about[0];

    return (
      <section className='section about-section'>
        <div className='section-track'>
          <div className='content about-content'>
            <div className='content-short'>
              <div className='about-media'>
                <Link
                  to={`/~vasilisakarelova/wastedtalent/build/${page.url}`}
                  className='section-link'
                  data-section-link
                  onClick={ev => setSectionLink(ev)}
                  >
                    <img className='about-logo' src={page.logo}/>
                  </Link>
              </div>
            </div>
            <div className='content-long'>
              <div className='about-intro' dangerouslySetInnerHTML={{ __html: page.abouttext }}></div>
              <div className='about-text' dangerouslySetInnerHTML={{ __html: page.impressumtext }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
