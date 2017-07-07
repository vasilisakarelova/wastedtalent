import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Management extends React.Component {
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
    const artistsList = [];
    let page = DataStore.getAll().pages.management[0];
    let posts = DataStore.getAll().posts;

    posts.map((artist,i) => {
      artistsList.push(
        <div className='artist-block'>
          <Link
            key={i}
            to={`/${artist.url}`}
            style={{marginRight: '10px'}}
            className='artist-link'
            >
            <span className='artist-name'>{artist.title}</span>
          </Link>
          <span className='artist-media'>
            <img className='artist-intro-image' src={artist.intro_image}/>
          </span>
          <div>{artist.intro_text}</div>
        </div>
      );
    });

    return (
      <section className='section management-section' data-prio={prio} data-open='false'>
        <div className='section-track'>
          <div className='content management-content'>
            <Link
              to={`/${page.url}`}
              className='section-link'
              data-section-link
              >
              <div className='content-short'>
                  <h1 className='title management-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
                <div className='intro management-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
              </div>
              <div className='content-long'>
                <div className='management-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
                <div className='artists-container'>{artistsList}</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Management;
