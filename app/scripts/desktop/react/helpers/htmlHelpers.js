export function setBodyLayoutClassName(layoutClass) {
  const classList = window.document.body.classList;
  [].slice.call(classList)
    .filter(c => (/^(layout--|designtlog-)/).test(c))
    .forEach(c => classList.remove(c));
  classList.add(layoutClass);
}
