import {Link} from 'react-router-dom';
import $ from 'jquery';
import slick from 'slick-carousel';
import DataStore from 'flux/stores/DataStore.js'

import About from 'components/About.js'
import Artist from 'components/Artist.js'
import Digital from 'components/Digital.js'
import Home from 'components/Home.js'
import Management from 'components/Management.js'
import Publishing from 'components/Publishing.js'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      filter: 'about'
    };
  }

  componentDidMount() {
    const opts = {
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      adaptiveHeight: true,
      nextArrow: `
      <span class="arrow-right"><i id="triangle-right"></i></span>
      `,
      prevArrow: `
      <span class="arrow-left"><i id="triangle-left"></i></span>
      `,
      responsive: [{
        breakpoint: 768,
        settings: 'unslick'
      }]
    };

    document.querySelector('[data-slider]').addEventListener('click', (ev) => {
      const element = document.querySelector('.slick-initialized');
      if (window.innerWidth <= 768 && element == null) {
        $('[data-slider]').slick(opts);
      }
    });

    $('[data-slider]').on('afterChange', (event, slick, currentSlide, nextSlide) => {
      let currentSection = slick.$slides.get(currentSlide).dataset.link;
      switch (currentSection) {
        case 'management':
        case 'publishing':
          document.querySelectorAll('.slick-arrow').forEach( (arrow) => {
            arrow.style.color = '#fff';
          });
          break;
        case 'about':
        case 'digital':
          document.querySelectorAll('.slick-arrow').forEach( (arrow) => {
            arrow.style.color = '#000';
          });
          break;
      }
    });

    window.addEventListener('resize', () => {
      const element = document.querySelector('.slick-initialized');
      if (window.innerWidth < 769 && element != null) {
        $('[data-slider]').slick('resize');
      }
    })

    document.querySelectorAll('.section.main').forEach((section) => {
      const sectionContent = section.querySelector('.content')
      let firstClone = sectionContent.cloneNode(true);
      let secondClone = sectionContent.cloneNode(true);
      let thirdClone = sectionContent.cloneNode(true);
      let fourthClone = sectionContent.cloneNode(true);

      firstClone.classList.add('is-clone');
      secondClone.classList.add('is-clone');
      thirdClone.classList.add('is-clone');
      section.querySelector('.section-track').appendChild(firstClone);
      section.querySelector('.section-track').appendChild(secondClone);
      section.querySelector('.section-track').appendChild(thirdClone);
    })

    document.querySelectorAll('.animate').forEach((img) => {
      img.addEventListener('mouseleave', () => {
        img.classList.add('strobe')
      })
      img.addEventListener('animationend', () => {
        img.classList.remove('strobe')
      })
    })
  }

  render() {
    let paths = [];
    let allPages = DataStore.getAll().pages;
    let allPosts = DataStore.getAll().posts;
    Object.keys(allPages).map(path => paths.push(path))
    allPosts.map(path => paths.push(path.url))

    return (
      <div className='track' data-slider>
        <About />
        <Management />
        <Publishing />
        <Digital />
      </div>
    );
  }
}

export default Header;
