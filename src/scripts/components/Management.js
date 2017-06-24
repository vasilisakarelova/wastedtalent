import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'

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
              to={`/~vasilisakarelova/wastedtalent3/build/${artist.url}`}
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
            <h1 className='title management-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
            <div className='intro management-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
            <div className='management-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
            <div className='artists-container'>{artistsList}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Management;
