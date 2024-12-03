
// JavaScript example 4: HTML-markup creator and editor

const markup = {
  inner_container_id: 'MU_container',
  validElements: {
    a: 1,
    div: 1,
    
    p: 1,
    span: 1,
    b: 1,
    strong: 1,
    i: 1,
    em: 1,
    sup: 1,
    sub: 1,
    code: 1,
    pre: 1,
    h1: 1,
    h2: 1,
    h3: 1,
    h4: 1,
    h5: 1,
    h6: 1,
    
    ul: 1,
    ol: 1,
    li: 1,
    data: 1,
    
    main: 1,
    article: 1,
    aside: 1,
    section: 1,
    header: 1,
    footer: 1,
    nav: 1,
    hgroup: 1,

    table: 1,
    thead: 1,
    tbody: 1,
    caption: 1,
    tr: 1,
    th: 1,
    td: 1,
    colgroup: 1,
    col: 0,

    form: 1,
    fieldset: 1,
    legend: 1,
    label: 1,

    input: 0,
    button: 1,
    hr: 0,
    br: 0,
    wbr: 0,
  },
  createElement: function (elName, props){
    if (elName in markup.validElements){
      let el = document.createElement(elName);
      if ('innerHTML' in props){
        el.innerHTML = props.innerHTML;
      }
      if ('attr' in props){
        for (const [name, value] of Object.entries(props)){
          el.setAttribute(name, value);
        }
      }
      return el;
    } else {
      return;
    }
  },
  appendElement: function (el, parent){
    parent.appendChild(el);
  },
  returnClickedElement: function (el){
    
  },
  clickListener: function (e){
    console.log(e.type);
    e.stopPropagation();
  },
  setupContainer: function (outer_container_id){
    const outer = document.getElementById(outer_container_id);
    const inner = document.createElement('div');
    inner.id = markup.inner_container_id;
    inner.addEventListener('click', markup.clickListener);
    outer.appendChild(inner);
  },
  isInsideInner: function (el){
    const inner = document.getElementById(markup.inner_container_id);
    if (inner && !(inner.isSameNode(el))){
      return inner.contains(el);
    }
    return false;
  },
  
};
