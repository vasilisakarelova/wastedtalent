import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Digital extends React.Component {
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
    let page = DataStore.getAll().pages.digital[0];

    return (
      <section className='section digital-section' data-prio={prio} data-open='false'>
        <div className='section-track'>
          <div className='content digital-content'>
            <Link
              to={`/${page.url}`}
              className='section-link'
              data-section-link
              >
              <div className='content-short'>
                    <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
                <div className='intro digital-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
              </div>
              <div className='content-long'>
                <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
                <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.d_content }}></div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Digital;
