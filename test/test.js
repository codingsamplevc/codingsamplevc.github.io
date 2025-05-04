const test = {
  constants: {
    refs: {
      svg_container: 'svg_container',
    },
    svg: {
      circle_size: 50,
      circle_xy: this.circle_size / 2,
      circle_r: this.circle_xy / 2,
      // circle_red: this.createSVG_Circle('red'),
      // circle_black: this.createSVG_Circle('black'),
    },
  },
  createSVG_Circle: (size,xy,radius,color) => {
    const _svg = document.createElement('svg', { width: size, height: size });
    _svg.width = size;
    _svg.height = size;
    const _circle = document.createElement('circle', { cx: xy, cy: xy, r: radius, style: `fill:${color}` });
    _circle.cx = xy;
    _circle.cy = xy;
    _circle.r = radius;
    _circle.style = `fill:${color}`;
    _svg.append(_circle);
    return _svg;
  },
  attach_SVG_toContainer: (element) => {
    const c = document.getElementById('svg_container');
    c.append(element);
  },
};
test.attach_SVG_toContainer(test.createSVG_Circle(test.constants.svg.circle_size,test.constants.svg.circle_xy,test.constants.svg.circle_r,'red'));
