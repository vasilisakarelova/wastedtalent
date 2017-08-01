import { Link } from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'
import setSectionLink from 'flux/actions/SetSectionLink.js'
import $ from 'jquery';

class About extends React.Component {
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
    const context = document.querySelector('#about');
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
    let page = DataStore.getAll().pages.about[0];

    return (
      <section className='section main about-section' data-prio={prio} data-open='false' data-link='about'>
        <div className='section-track' id='about' onScroll={this.handleScroll}>
          <div className='content about-content'>
            <div className='content-short'>
              <div className='about-media'>
                <Link to={`/`}><img className='about-logo animate' src={page.logo}/></Link>
              </div>
            </div>
            <div className='content-long'>
              <div className='about-intro' dangerouslySetInnerHTML={{ __html: page.abouttext }}></div>
              <div className='about-text' dangerouslySetInnerHTML={{ __html: page.impressumtext }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
