import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class About extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const second = document.querySelector('[data-prio="secondary"]')
    if (second == null) {
      return;
    }
    const longContent = second.querySelector('.content-long')

    second.classList.add('is-open')
    longContent.classList.add('is-visible')
  }

  render() {
    const prio = this.props.dataPriority;
    let page = DataStore.getAll().pages.about[0];

    return (
      <section className='section about-section' data-prio={prio} data-open='false'>
        <div className='section-track'>
          <div className='content about-content'>
            <Link
              to={`/${page.url}`}
              className='section-link'
              data-section-link
              >
              <div className='content-short'>
                <div className='about-media'>
                  <img className='about-logo' src={page.logo}/>
                </div>
              </div>
              <div className='content-long'>
                <div className='about-intro' dangerouslySetInnerHTML={{ __html: page.abouttext }}></div>
                <div className='about-text' dangerouslySetInnerHTML={{ __html: page.impressumtext }}></div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
