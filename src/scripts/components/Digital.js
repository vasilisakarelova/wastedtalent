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

  handleScroll() {
    const context = document.querySelector('#digital');
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
    } else if (scrolledFromTop < clones[0].offsetHeight) {
      const removeClones = clones.splice(3);
      removeClones.forEach(removeClone => {
        context.removeChild(removeClone)
      })
    }
  }

  render() {
    const prio = this.props.dataPriority;
    let page = DataStore.getAll().pages.digital[0];

    return (
      <section className='section main digital-section' data-prio={prio} data-open='false' data-link='digital'>
        <div className='section-track' id='digital' onScroll={this.handleScroll}>
          <div className='content digital-content'>
            <div className='content-short'>
                  <h1 className='title digital-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
              <div className='intro digital-intro'><p>{page.headline}</p></div>
            </div>
            <div className='content-long'>
              <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
              <div className='digital-text' dangerouslySetInnerHTML={{ __html: page.d_content.replace(/<p><span class="content-img">/i, '<p class="columns"><span class="content-img">') }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Digital;
