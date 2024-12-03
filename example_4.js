
// JavaScript example 4: HTML-markup creator and editor

const a = {
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
  a: 0,
  b: function (){
    
  },
  createElement: function (elName, props){
    if (elName in js4) {
      let el = document.createElement(elName);
    } else {
      return;
    }
    
  },
};
