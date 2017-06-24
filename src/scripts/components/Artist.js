import DataStore from 'flux/stores/DataStore.js'

class Artist extends React.Component {
  render() {
    let posts = DataStore.getAll().posts;
    const filter = this.props.match.path.split('/').pop();
    const artist = posts.filter(post => {
      if(post['url'] == filter) {
        return post;
      }
    });
    const gallery = artist[0].main_gallery.map(img => {
      return(
        <img className='artist-gallery-item' src={img.src} />
      );
    });

    return (
      <div className='artist-section'>
        <h1 className='title artist-title' dangerouslySetInnerHTML={{ __html: artist[0].title }}></h1>
        <div className='artist-content'>
          <div className='artist-story' dangerouslySetInnerHTML={{ __html: artist[0].main_text }}></div>
        </div>
        <div className='artist-gallery'>
          { gallery }
        </div>
      </div>
    );
  }
}

export default Artist;
