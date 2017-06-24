import DataStore from 'flux/stores/DataStore.js'

class Publishing extends React.Component {
  render() {
    let page = DataStore.getAll().pages.publishing[0];

    return (
      <section className='section publishing-section'>
        <div className='section-track'>
          <div className='content publishing-content'>
            <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
            <div className='intro publishing-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
            <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.p_content }}></div>
          </div>
        </div>
      </section>
    );
  }
}

export default Publishing;
