
// JavaScript example 4: HTML-markup creator and editor

const markup = {
  selected: null,
  editor_id: 'MU_editor',
  inner_container_id: 'MU_container',
  ValidElements: {
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
    if (elName in markup.ValidElements){
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
    // const edit_window = document.getElementById(markup.editor_id);
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
  editor: function (){
    const editor = document.createElement('form');
    editor.id = markup.editor_id;
    const form_fs = document.createElement('fieldset');
    editor.appendChild(form_fs);
    const fs_legend = document.createElement('legend');
    fs_legend.innerHTML = 'Markup Editing Window';
    form_fs.appendChild(fs_legend);

    const desc = document.createElement('p');
    desc.innerHTML = "Press 'Select element' to choose which element to insert in relation to.";
    form_fs.appendChild(desc);

    // Button that makes elements in Markup container selectable
    const sel_el_btn = document.createElement('button');
    sel_el_btn.innerHTML = 'Select element';
    sel_el_btn.onclick = function (){
      // Make elements in container selectable
      // Maybe: change inline style of container so that hovered over elements get a border
    }
    form_fs.appendChild(sel_el_btn);

    // Button that inserts new element after selected element
    const ins_after_btn = document.createElement('button');
    ins_after_btn.innerHTML = 'Insert after';
    ins_after_btn.onclick = markup.insertAfter;
    form_fs.appendChild(ins_after_btn);

    // Values/settings of new or selected element
    
    const type_label = document.createElement('label');
    type_label.for = 'MU_type';
    type_label.innerHTML = 'Tag-type of element:';
    form_fs.appendChild(type_label);
    // const type_input = document.createElement('input'); // Type of element
    // type_input.id = 'MU_type';
    // type_input.type = 'text';
    // type_input.name = 'MU_type';
    // type_input.value = '';
    // form_fs.appendChild(type_label);
    // form_fs.appendChild(type_input);

    const type_select = document.createElement('select');
    type_select.name = 'MU_type';
    type_select.id = 'MU_type';
    for (const tagName in Object.keys(markup.validElements)){
      const option = document.createElement('option');
      option.value = tagName;
      option.innerHTML = tagName;
      type_select.appendChild(option);
    }
    form_fs.appendChild(type_select);
    
    const inner_html_label = document.createElement('label');
    inner_html_label.for = 'MU_inner_html';
    inner_html_label.innerHTML = 'innerHTML of element:';
    form_fs.appendChild(inner_html_label);
    const inner_html_input = document.createElement('input');
    inner_html_input.id = 'MU_inner_html';
    inner_html_input.type = 'text';
    inner_html_input.name = 'MU_inner_html';
    inner_html_input.value = '';
    form_fs.appendChild(inner_html_input);
    
    // outer.appendChild(editor);

    // const el_br = document.createElement('br');
    // outer.appendChild(el_br);

    return editor;
  },
  setupContainer: function (outer_container_id){
    const outer = document.getElementById(outer_container_id);
    
    if (!document.getElementById(markup.editor_id)){
      const editor = markup.editor();
      // const editor = document.createElement('form');
      // editor.id = markup.editor_id;
      // const form_fs = document.createElement('fieldset');
      // editor.appendChild(form_fs);
      // const fs_legend = document.createElement('legend');
      // fs_legend.innerHTML = 'Markup Editing Window';
      // form_fs.appendChild(fs_legend);

      // const desc = document.createElement('p');
      // desc.innerHTML = "Press 'Select element' to choose which element to insert in relation to.";
      // form_fs.appendChild(desc);

      // const sel_el_btn = document.createElement('button');
      // sel_el_btn.innerHTML = 'Select element';
      // sel_el_btn.onclick = function (){
      //   // Make elements in container selectable
      //   // Maybe: change inline style of container so that hovered over elements get a border
      // }
      // form_fs.appendChild(sel_el_btn);
      
      // const ins_after_btn = document.createElement('button');
      // ins_after_btn.onclick = markup.insertAfter;
      // ins_after_btn.innerHTML = 'Insert after';
      // form_fs.appendChild(ins_after_btn);

      // const type_label = document.createElement('label');
      // type_label.for = 'MU_type';
      // type_label.innerHTML = 'Type of element:';
      // const type_input = document.createElement('input');
      // type_input.id = 'MU_type';
      // type_input.type = 'text';
      // type_input.name = 'MU_type';
      // type_input.value = '';
      // form_fs.appendChild(type_label);
      // form_fs.appendChild(type_input);
      
      // const inner_html_label = document.createElement('label');
      // inner_html_label.for = 'MU_inner_html';
      // inner_html_label.innerHTML = 'innerHTML of element:';
      // const inner_html_input = document.createElement('input');
      // inner_html_input.id = 'MU_inner_html';
      // inner_html_input.type = 'text';
      // inner_html_input.name = 'MU_inner_html';
      // inner_html_input.value = '';
      // form_fs.appendChild(inner_html_label);
      // form_fs.appendChild(inner_html_input);
      
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
