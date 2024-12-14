
// JavaScript example 4: HTML-markup creator and editor

const markup = {
  selected: null,
  // inner_container_id: 'MU_container',
  // editor_id: 'MU_editor',
  ids: {
    editor: 'MU_editor',
    editor_type: 'MU_type',
    editor_inner_html: 'MU_inner_html',
    editor_attr: 'MU_attr',
    inner_container: 'MU_container',
    selected: 'MU_selected',
  },
  ValidElements: {
    a: 'Uncategorized',
    div: 'Uncategorized',
    button: 'Uncategorized',
    hr: 'Uncategorized',
    br: 'Uncategorized',
    wbr: 'Uncategorized',
    
    p: 'Text',
    span: 'Text',
    b: 'Text',
    strong: 'Text',
    i: 'Text',
    em: 'Text',
    sup: 'Text',
    sub: 'Text',
    code: 'Text',
    pre: 'Text',
    h1: 'Text',
    h2: 'Text',
    h3: 'Text',
    h4: 'Text',
    h5: 'Text',
    h6: 'Text',
    
    ul: 'Lists',
    ol: 'Lists',
    li: 'Lists',
    data: 'Lists',
    
    main: 'Layout',
    article: 'Layout',
    aside: 'Layout',
    section: 'Layout',
    header: 'Layout',
    footer: 'Layout',
    nav: 'Layout',
    hgroup: 'Layout',

    table: 'Table',
    thead: 'Table',
    tbody: 'Table',
    caption: 'Table',
    tr: 'Table',
    th: 'Table',
    td: 'Table',
    colgroup: 'Table',
    col: 'Table',

    form: 'Form',
    fieldset: 'Form',
    legend: 'Form',
    label: 'Form',
    input: 'Form',
  },
  setupContainer: function (outer_container_id){ // Setup: Sets up the editor and the container
    const outer = document.getElementById(outer_container_id);
    
    if (!document.getElementById(markup.ids.editor)){
      const editor = markup.editor();
      
      outer.appendChild(editor);

      const el_br = document.createElement('br');
      outer.appendChild(el_br);
    }
    if (!document.getElementById(markup.ids.inner_container)){
      const inner = document.createElement('div');
      inner.id = markup.ids.inner_container;
      inner.addEventListener('click', markup.clickListener);
      outer.appendChild(inner);
    }
  },
  editor: function (){ // Editor form
    const editor = document.createElement('form');
    editor.id = markup.ids.editor;
    editor.addEventListener('submit', (e) => {e.preventDefault()});
    
    const form_fs = document.createElement('fieldset');
    editor.appendChild(form_fs);
    const fs_legend = document.createElement('legend');
    fs_legend.innerHTML = 'Markup Editing Window';
    form_fs.appendChild(fs_legend);

    const desc = document.createElement('p');
    desc.innerHTML = "Press 'Select element' to choose which element to insert in relation to.";
    form_fs.appendChild(desc);

    
    // const sel_el_btn = document.createElement('button'); // Button that makes elements in Markup container selectable
    // sel_el_btn.innerHTML = 'Select element';
    // sel_el_btn.onclick = function (){
    //   // Make elements in container selectable
    //   // Maybe: change inline style of container so that hovered over elements get a border
    // };
    // form_fs.appendChild(sel_el_btn);

    // Button that inserts new element after selected element
    const addToContainer_btn = document.createElement('button');
    addToContainer_btn.innerHTML = 'Add to Markup Container';
    addToContainer_btn.onclick = markup.insertContainer;
    form_fs.appendChild(addToContainer_btn);
    
    // Button that inserts new element after selected element
    const ins_after_btn = document.createElement('button');
    ins_after_btn.innerHTML = 'Insert after selected';
    ins_after_btn.onclick = markup.insertAfter;
    form_fs.appendChild(ins_after_btn);
    
    // Button that inserts new element after selected element
    const ins_before_btn = document.createElement('button');
    ins_before_btn.innerHTML = 'Insert before selected';
    ins_before_btn.onclick = markup.insertBefore;
    form_fs.appendChild(ins_before_btn);

    // Values/settings of new or selected element
    
    const type_label = document.createElement('label');
    type_label.for = 'MU_type';
    type_label.innerHTML = 'Tag-type of element:';
    form_fs.appendChild(type_label);

    const type_select = document.createElement('select');
    type_select.id = markup.ids.editor_type;

    const tmp_optgroups = {};
    for (const [tagName, optGroup] of Object.entries(markup.ValidElements)){
      if (!(optGroup in tmp_optgroups)){
        tmp_optgroups[optGroup] = [];
      }
      tmp_optgroups[optGroup].push(tagName);
    }
    for (const optGroup in tmp_optgroups){
      let tmp = document.createElement('optgroup');
      tmp.label = optGroup;
      for (const tagName of tmp_optgroups[optGroup]){
        let tmp2 = document.createElement('option');
        tmp2.value = tagName;
        tmp2.innerHTML = tagName;
        tmp.appendChild(tmp2);
      }
      type_select.appendChild(tmp);
    }
    
    form_fs.appendChild(type_select);
    
    const inner_html_label = document.createElement('label');
    inner_html_label.for = markup.ids.editor_inner_html;
    inner_html_label.innerHTML = 'innerHTML of element:';
    form_fs.appendChild(inner_html_label);
    const inner_html_input = document.createElement('input');
    inner_html_input.id = markup.ids.editor_inner_html;
    inner_html_input.type = 'text';
    inner_html_input.value = '';
    form_fs.appendChild(inner_html_input);

    const attr_label = document.createElement('label');
    attr_label.for = markup.ids.editor_attr;
    attr_label.innerHTML = 'Attributes of element (format -> "name value,name value, ..."):';
    form_fs.appendChild(attr_label);
    const attr_input = document.createElement('input');
    attr_input.id = markup.ids.editor_attr;
    attr_input.type = 'text';
    attr_input.value = '';
    form_fs.appendChild(attr_input);


    return editor;
  },
  isInsideContainer: function (el){
    const container = document.getElementById(markup.ids.inner_container);
    if (container && !(container.isSameNode(el))){
      return container.contains(el);
    }
    return false;
  },
  createElement: function (elValues){
    if (elValues.type in markup.ValidElements){
      const el = document.createElement(elValues.type);
      if (elValues.inner_html){
        el.innerHTML = elValues.inner_html;
      }
      if (elValues.attr){
        for (const [name, value] of Object.entries(elValues.attr)){
          el.setAttribute(name, value);
        }
      }
      return el;
    } else {
      return;
    }
  },
  getEdits: function (){
    const type = document.getElementById(markup.ids.editor_type).value;
    const inner_html = document.getElementById(markup.ids.editor_inner_html).value;
    let attr = {};
    let tmp = document.getElementById(markup.ids.editor_attr).value;
    if (tmp){
      tmp = tmp.split(',');
      tmp.forEach((kv) => { let _ = kv.split(' '); attr[_[0]] = _[1] });
      tmp = null;
    } else {
      attr = null;
    }
    return { type: type, inner_html: inner_html, attr: attr };
  },
  appendElement: function (parent, el){
    parent.appendChild(el);
  },
  insertAfter: function (){
    if (markup.selected){
      const el = markup.createElement(markup.getEdits());
      markup.selected.after(el);
    }
  },
  insertBefore: function (){
    if (markup.selected){
      const el = markup.createElement(markup.getEdits());
      markup.selected.before(el);
    }
  },
  insertContainer: function (){
    const container = document.getElementById(markup.ids.inner_container);
    if (container){
      const el = markup.createElement(markup.getEdits());
      container.appendChild(el);
    }
  },
  clickListener: function (e){ // Listener for Markup container

    if (!markup.isInsideContainer(e.target)){
      e.stopPropagation();
      return;
    }
    
    console.log(e.target);
    // console.log(e.type);

    if (!markup.selected){
      markup.selected = e.target;
      e.target.id = markup.ids.selected;
    } else if (!(markup.selected.isSameNode(e.target))){
      markup.selected.removeAttribute('id');
      markup.selected = e.target;
      e.target.id = markup.ids.selected;
    } else {
      markup.selected.removeAttribute('id');
      markup.selected = null;
    }

    
    
    e.stopPropagation();
  },
  
};
