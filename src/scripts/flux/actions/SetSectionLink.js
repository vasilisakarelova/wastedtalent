import { BrowserRouter as Router } from 'react-router-dom'

function SectionLinks(ev) {

  if (window.innerWidth >= 800) {
    ev.preventDefault()
    return;
  }
  Router.goBack();
  console.log(ev.target)
  /*
  const targetedSection = ev.target.closest('.section');
  const contentLong = targetedSection.querySelector('.content-long');
  let isOpen = targetedSection.dataset.open;
  switch (isOpen) {
    case 'true':
      Router.goBack();
      contentLong.classList.remove('is-visible');
      targetedSection.classList.remove('is-open');
      targetedSection.dataset.open = 'false';
      break;
  }*/
}

export default function setSectionLink(ev) {
  return new SectionLinks(ev);
}
