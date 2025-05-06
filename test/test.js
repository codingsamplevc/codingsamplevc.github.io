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
    // const _svg = document.createElement('svg', { width: size, height: size });
    // _svg.xmlns = "http://www.w3.org/2000/svg"; // Add attributes
    // _svg.xmlns:xlink="http://www.w3.org/1999/xlink"
    // _svg.width = size;
    // _svg.height = size;
    // const _circle = document.createElement('circle', { cx: xy, cy: xy, r: radius, style: `fill:${color}` });
    // _circle.cx = xy;
    // _circle.cy = xy;
    // _circle.r = radius;
    // _circle.style = `fill:${color}`;
    // _svg.append(_circle);

    const _svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    _svg.setAttribute('width', `${size}`);
    _svg.setAttribute('height', `${size}`);
    // _svg.setAttribute('style', `fill: ${}`);
    _svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

    // const _circle = document.createTextNode("circle { cx: 25; cy: 25; r: 12.5; fill: red; }"); // cx: 25, cy: 25, r: 12.5, 
    const _circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); // cx: 25, cy: 25, r: 12.5, 
    _circle.setAttributeNS("http://www.w3.org/2000/svg", 'cx', xy);
    _circle.setAttributeNS("http://www.w3.org/2000/svg", 'cy', xy);
    _circle.setAttributeNS("http://www.w3.org/2000/svg", 'r', radius);
    _circle.setAttribute('style', `fill: ${color}`);
    
    // document.body.appendChild(svg);
    
    // Create the `style` element in the SVG namespace
    // const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    // const node = document.createTextNode("circle { fill: red; }"); // cx: 25, cy: 25, r: 12.5, 
    // style.appendChild(node);
    
    // Append the style element to the SVG element
    // _svg.appendChild(style);

    _svg.appendChild(_circle);

    return _svg;

  },
  attach_SVG_toContainer: (element) => {
    const c = document.getElementById('svg_container');
    c.append(element);
  },
};
test.attach_SVG_toContainer(test.createSVG_Circle(test.constants.svg.circle_size,test.constants.svg.circle_xy,test.constants.svg.circle_r,'red'));
