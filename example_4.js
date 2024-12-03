
// JavaScript example 4: HTML-markup creator and editor

const markup = {
  edit_window_id: 'MU_editor',
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
  getEdits: function (){
    // const edit_window = document.getElementById(markup.edit_window_id);
    const el_type = document.getElementById('MU_type').value;
    const inner_html = document.getElementById('MU_inner_html').value;
  },
  appendElement: function (el, parent){
    parent.appendChild(el);
  },
  insertAfter: function (target, el){
    target.after(el);
  },
  insertBefore: function (target, el){
    target.before(el);
  },
  clickListener: function (e){
    console.log(e.type);
    e.stopPropagation();
  },
  setupContainer: function (outer_container_id){
    const outer = document.getElementById(outer_container_id);
    
    if (!document.getElementById(markup.edit_window_id)){
      const editor = document.createElement('div');
      editor.id = markup.editor_window_id;

      const desc = document.createElement('p');
      desc.innerHTML = "Press 'Select element' to choose which element to insert in relation to.";
      editor.appendChild(desc);

      const sel_el_btn = document.createElement('button');
      sel_el_btn.innerHTML = 'Select element';
      sel_el_btn.onclick = function (){
        // Make elements in container selectable
        // Maybe: change inline style of container so that hovered over elements get a border
      }
      editor.appendChild(sel_el_btn);
      
      const ins_after_btn = document.createElement('button');
      ins_after_btn.onclick = markup.insertAfter;
      ins_after_btn.innerHTML = 'Insert after';
      editor.appendChild(ins_after_btn);

      const el_type_label = document.createElement('label');
      el_type_label.for = 'type';
      el_type_label.innerHTML = 'Type of element:';
      const el_type_input = document.createElement('input');
      el_type_input.id = 'MU_type';
      el_type_input.type = 'text';
      el_type_input.name = 'type';
      el_type_input.value = '';
      editor.appendChild(el_type_label);
      editor.appendChild(el_type_input);
      
      const el_inner_html_label = document.createElement('label');
      el_inner_html_label.for = 'innerhtml';
      el_inner_html_label.innerHTML = 'innerHTML of element:';
      const el_inner_html_input = document.createElement('input');
      el_inner_html_input.id = 'MU_inner_html';
      el_inner_html_input.type = 'text';
      el_inner_html_input.name = 'innerhtml';
      el_inner_html_input.value = '';
      editor.appendChild(el_inner_html_label);
      editor.appendChild(el_inner_html_input);
      
      outer.appendChild(editor);

      const el_br = document.createElement('br');
      outer.appendChild(el_br);
    }
    if (!document.getElementById(markup.inner_container_id)){
      const inner = document.createElement('div');
      inner.id = markup.inner_container_id;
      inner.addEventListener('click', markup.clickListener);
      outer.appendChild(inner);
    }
  },
  isInsideInner: function (el){
    const inner = document.getElementById(markup.inner_container_id);
    if (inner && !(inner.isSameNode(el))){
      return inner.contains(el);
    }
    return false;
  },
  
};
