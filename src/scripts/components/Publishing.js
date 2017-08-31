import {Link} from 'react-router-dom'
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

  handleScroll() {
    const context = document.querySelector('#publishing');
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
    const prio = this.props.dataPriority;
    let page = DataStore.getAll().pages.publishing[0];

    return (
      <section className='section main publishing-section' data-prio={prio} data-open='false' data-link='publishing'>
        <div className='section-track' id='publishing' onScroll={this.handleScroll}>
          <div className='content publishing-content'>
            <div className='content-short'>
              <h1 className='title publishing-title' dangerouslySetInnerHTML={{ __html: page.title }}></h1>
              <div className='intro publishing-intro'><p>{page.headline}</p></div>
            </div>
            <div className='content-long'>
              <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
              <div className='publishing-text' dangerouslySetInnerHTML={{ __html: page.p_content.replace(/<span class="content-img"><a/g, '<span class="inline-img"><a class="animate"') }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Publishing;
