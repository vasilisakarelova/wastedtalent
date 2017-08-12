import DataStore from 'flux/stores/DataStore.js'

class LoaderImg extends React.Component {
  render() {
    const imgSrc = DataStore.getAll().pages.about[0].logo
    
    return (
      <div className='preloader-item' data-preloader-item>
        <img className='preloader-logo' src={imgSrc} />
      </div>
    );
  }
}

export default LoaderImg;
