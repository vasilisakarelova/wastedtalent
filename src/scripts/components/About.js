import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'

class About extends React.Component {
  render() {
    //let pageData = DataStore.getPageBySlug('abou t');
    let page = DataStore.getAll().pages.about[0];

    return (
      <section className='section about-section'>
        <div className='section-track'>
          <div className='content about-content'>
            <div className='about-media'>
              <img className='about-logo' src={page.logo}/>
            </div>
            <div className='about-intro' dangerouslySetInnerHTML={{ __html: page.abouttext }}></div>
            <div className='about-text' dangerouslySetInnerHTML={{ __html: page.impressumtext }}></div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
