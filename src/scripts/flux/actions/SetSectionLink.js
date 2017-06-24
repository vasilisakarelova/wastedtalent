function SectionLinks(ev) {
  if (window.innerWidth >= 800) {
    ev.preventDefault()
  }
}

export default function setSectionLink(ev) {
  return new SectionLinks(ev);
}
