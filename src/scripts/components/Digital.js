import DataStore from 'flux/stores/DataStore.js'

class Digital extends React.Component {
  render() {
    let page = DataStore.getAll().pages.digital[0];

    return (
      <section className='section digital-section'>
        <div className='section-track'>
          <div className='content digital-content'>
            <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
            <div className='intro digital-intro' dangerouslySetInnerHTML={{ __html: page.headline }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
            <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.d_content }}></div>
          </div>
        </div>
      </section>
    );
  }
}

export default Digital;
