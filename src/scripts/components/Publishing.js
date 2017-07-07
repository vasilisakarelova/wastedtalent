import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Publishing extends React.Component {
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
    let page = DataStore.getAll().pages.publishing[0];

    return (
      <section className='section publishing-section' data-prio={prio} data-open='false'>
        <div className='section-track'>
          <div className='content publishing-content'>
            <Link
              to={`/${page.url}`}
              className='section-link'
              data-section-link
              >
              <div className='content-short'>
                <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
                <div className='intro publishing-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
              </div>
              <div className='content-long'>
                <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
                <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.p_content }}></div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Publishing;
