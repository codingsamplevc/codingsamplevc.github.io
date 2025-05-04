const test = {
  constants: {
    refs: {
      svg_container: document.getElementById('svg_container'),
    },
    svg: {
      circle_size: 50,
      circle_xy: this.constants.svg.circle_size / 2,
      circle_r: this.constants.svg.circle_xy / 2,
      circle_red: this.createSVG_Circle('red'),
      circle_black: this.createSVG_Circle('black'),
    },
  },
  createSVG_Circle: (color) => {
    const _svg = document.createElement('svg', { width: this.constants.svg.circle_size, height: this.constants.svg.circle_size });
    const _circle = document.createElement('circle', { cx: this.constants.svg.circle_xy, cy: this.constants.svg.circle_xy, r: this.constants.svg.circle_r, style: `fill:${color}` });
    _svg.innerHTML = _circle;
    return _svg;
  },
  attach_SVG_toContainer: (element) => {
    this.contants.refs.svg_container.append(element);
  },
};
test.attach_SVG_toContainer(test.constants.svg.circle_red);
