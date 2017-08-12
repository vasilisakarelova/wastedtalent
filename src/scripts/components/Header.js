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
    const preloaderItems = [...document.querySelectorAll('[data-preloader-item]')]

    let generateTranslate = (el, e, value) => {
      el.style.transform = `translate(${e.clientX*value}px, ${e.clientY*value}px)`;
    }
    let cumulativeOffset = (element) => {
      var top = 0, left = 0;
      do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while(element);

      return {
        top: top,
        left: left
      };
    };

    document.onmousemove = (event) => {
      preloaderItems.forEach((preloaderItem) => {
        let e = event || window.event;
        let x = (e.pageX - cumulativeOffset(preloaderItem).left - (350 / 2)) * -1 / 100;
        let y = (e.pageY - cumulativeOffset(preloaderItem).top - (350 / 2)) * -1 / 100;

        let matrix = [
          [1, 0, 0, -x * 0.00005],
          [0, 1, 0, -y * 0.00005],
          [0, 0, 1, 1],
          [0, 0, 0, 1]
        ];

        preloaderItem.style.transform = `matrix3d(${matrix.toString()})`;
      })
    }

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

      document.querySelectorAll('.animate').forEach((img) => {
        if (img.parentNode.classList.contains('content-img')) {
          img.parentNode.style.height = `${img.offsetHeight}px`
        }
      })
    })

    document.querySelectorAll('.section.main').forEach((section) => {
      const sectionContent = section.querySelector('.content')
      let firstClone = sectionContent.cloneNode(true);

      firstClone.classList.add('is-clone');
      section.querySelector('.section-track').appendChild(firstClone);
    })

    document.querySelectorAll('.animate').forEach((img) => {
      img.onload = function () {
        if (img.parentNode.classList.contains('content-img')) {
          img.parentNode.style.height = `${img.offsetHeight}px`
        }
      }

      img.addEventListener('mouseleave', () => {
        img.classList.add('strobe')
      })
      img.addEventListener('animationend', () => {
        img.classList.remove('strobe')
      })
    })
  }

  render() {
    const logoSrc = DataStore.getAll().pages.about[0].logo
    const allPages = DataStore.getAll().pages
    const allPosts = DataStore.getAll().posts
    let paths = []

    Object.keys(allPages).map(path => paths.push(path))
    allPosts.map(path => paths.push(path.url))

    return (
      <div className='track' data-slider>
        <About logosrc={logoSrc} />
        <Management />
        <Publishing />
        <Digital />
      </div>
    );
  }
}

export default Header;
