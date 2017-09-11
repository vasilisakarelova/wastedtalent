export default (context, id) => {
  if (window.innerWidth < 769) {
    return
  }
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
    const removeClones = clones.splice(1);
    removeClones.forEach(removeClone => {
      context.removeChild(removeClone)
    })
  }
}
