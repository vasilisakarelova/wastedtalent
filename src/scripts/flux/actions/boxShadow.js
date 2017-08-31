function Shadow(ev, wrap, shadowColor) {
	const { offsetWidth: width, offsetHeight: height } = wrap;
	let { offsetX: x, offsetY: y } = ev;

	if (this !== ev.target) {
		x += ev.target.offsetLeft;
		y += ev.target.offsetTop;
	}

	const xWalk = Math.round((x / width * 40) - (40 / 2));
	const yWalk = Math.round((y / height * 40) - (40 / 2));

	wrap.style.boxShadow = `
		${xWalk}px ${yWalk}px 15px ${shadowColor}
	`;
}

export default function addShadow(ev, wrap, shadowColor) {
  return new Shadow(ev, wrap, shadowColor);
}
