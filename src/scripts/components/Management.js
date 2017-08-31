import {Link} from 'react-router-dom'
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import ProgressiveImage from 'react-progressive-image'

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

  handleScroll() {
    const context = document.querySelector('#management');
    const clones = [...context.querySelectorAll('.is-clone')];
    const shortContent = context.querySelector('.content-short');
    let possibleScroll = context.scrollHeight;
    let offsetHeight = context.offsetHeight;
    let scrolledFromTop = context.scrollTop;
    let loopHeight = 0;

    if ((scrolledFromTop + offsetHeight) >= possibleScroll) {
      const clone = context.querySelector('.is-clone');
      let newClone = clone.cloneNode(true);
      context.appendChild(newClone);
    } else if (scrolledFromTop < (offsetHeight + clones[0].offsetHeight)) {
      const removeClones = clones.splice(3);
      removeClones.forEach(removeClone => {
        context.removeChild(removeClone)
      })
    }
  }

  render() {
    const prio = this.props.dataPriority
    const artistsList = []
    let page = DataStore.getAll().pages.management[0]
    let posts = DataStore.getAll().posts

    posts.map((artist,i) => {
      artistsList.push(
        <Link
          key={i}
          to={`/${artist.url}`}
          style={{marginRight: '10px'}}
          className='artist-link'
          >
          <div className='artist-block' key={i}>
            <span className='artist-name'>{artist.title}</span>
            <span className='artist-media content-img'>
              <ProgressiveImage src={artist.intro_image} placeholder={artist.intro_image_thumb}>
                {(src) => <img className='animate' src={src} alt='an image'/>}
              </ProgressiveImage>
            </span>
            <div className='intro-text'><p dangerouslySetInnerHTML={{ __html: artist.intro_text }}></p></div>
          </div>
        </Link>
      );
    });

    return (
      <section className='section main management-section' data-prio={prio} data-open='false' data-link='management'>
        <div className='section-track' id='management' onScroll={this.handleScroll}>
          <div className='content management-content'>
            <div className='content-short'>
                <nobr><h1 className='title management-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1></nobr>
              <div className='intro management-intro'><p>{page.headline}</p></div>
            </div>
            <div className='content-long'>
              <div className='management-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
              <div className='artists-container'>{artistsList}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Management;
