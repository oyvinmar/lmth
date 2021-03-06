export default function esml(type, props, ...children) {
  const flattened = children.reduce((a, b) => a.concat(b), []);
  return { type, props: props || {}, children: flattened };
}

function isEventProp(name) {
  return /^on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

function setProp(el, name, value) {
  const target = el;
  if (isEventProp(name)) {
    target.addEventListener(extractEventName(name), value);
  } else if (name === 'className') {
    target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    target[name] = value;
  } else {
    target.setAttribute(name, value);
  }
}

function setProps(target, props) {
  Object.keys(props).forEach(name => {
    setProp(target, name, props[name]);
  });
}

function createElement(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node);
  }
  const el = document.createElement(node.type);
  setProps(el, node.props);
  node.children
    .map(createElement)
    .forEach(el.appendChild.bind(el));
  return el;
}

export function render(node, root) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(createElement(node));
}
