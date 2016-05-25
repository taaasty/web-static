export function setBodyLayoutClassName(layoutClasses) {
  const classList = window.document.body.classList;
  const addClasses = layoutClasses.split(' ');

  [].slice.call(classList)
    .filter(c => (/^(layout--|designtlog-)/).test(c))
    .forEach(c => classList.remove(c));
  addClasses.forEach((c) => classList.add(c));
}
