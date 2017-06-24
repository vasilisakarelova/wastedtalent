import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'

class Management extends React.Component {
  render() {
    const artistsList = [];
    let page = DataStore.getAll().pages.management[0];
    let posts = DataStore.getAll().posts;

    posts.map((artist,i) => {
      artistsList.push(
        <div className='artist-block'>
          <Link
              key={i}
              to={`/~vasilisakarelova/wastedtalent/build/${artist.url}`}
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
      <section className='section management-section'>
        <div className='section-track'>
          <div className='content management-content'>
            <div className='content-short'>
              <Link
                to={`/~vasilisakarelova/wastedtalent/build/${page.url}`}
                className='section-link'
                data-section-link
                onClick={ev => setSectionLink(ev)}
                >
                <h1 className='title management-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
              </Link>
              <div className='intro management-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
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
