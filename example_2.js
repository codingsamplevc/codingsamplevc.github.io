    // JavaScript example 2: Interactive CSS style options

  const css = {
    demo_id: "css_demo_text",
    form_id: "css_form",
    rules_id: "css_rules",
    convert: function (rules_obj){
      let rules_code = `_ {\n`;
      for (const prop in rules_obj){
        if (rules_obj[prop]){
          rules_code += `${prop}: ${rules_obj[prop]};\n`;
        }
      }
      rules_code += `}`;
      return rules_code;
    },
    modify: function (demo_text_id, changes, removes){
      const demo_text_el = document.getElementById(demo_text_id);
      const elStyle = demo_text_el.style;
  
      if (Object.keys(changes).length > 0){
        for (const prop in changes){
          elStyle.setProperty(prop, changes[prop]);
        }
        const rules = css.convert(changes);
        const codeblock = document.getElementById(css.rules_id);
        codeblock.innerHTML = rules;
      }
  
      if (Object.keys(removes).length > 0){
        for (const prop of removes){
          elStyle.removeProperty(prop);
        }
      }
    },
    handleChange: function (){
      const form = document.getElementById(css.form_id);
      
      const formData = new FormData(form);
      const formData_entries = formData.entries();
  
      const changes_obj = {};
      for (let kv of formData_entries){
        if (kv[0] == "font-size"){
          if (parseInt(kv[1]) > 0){
            changes_obj[kv[0]] = `${parseInt(kv[1])}px`;
          }
        } else {
          changes_obj[kv[0]] = kv[1];
        }
      }
      const removes_obj = {};
      css.modify("css_demo_text", changes_obj, removes_obj);
    },
    setup: function (container_id){

      if (document.getElementById(css.form_id)){ return; }
      
      const form = document.createElement("form");
      form.id = css.form_id;
      const rules = [
        [{desc: "Text color", name: "color", type: "color"}, {}],
        [{desc: "Font size", name: "font-size", type: "number"}, {min: 6, max: 50, value: 16}],
        [{desc: "Font (family)", name: "font-family", type: "text"}, {"font-family": ''}]
      ];
  
      for (const rule of rules){
        const label = document.createElement("label");
        label.setAttribute("for", rule[0].name);
        label.innerHTML = rule[0].desc;
        form.appendChild(label);
        
        const input = document.createElement("input");
        input.name = rule[0].name;
        input.type = rule[0].type;
        
        if (Object.keys(rule[1]).length > 0){
          for (const attr in rule[1]){
            input[attr] = rule[1][attr];
          }
        }
        form.appendChild(input);
      }
  
      const container = document.getElementById(container_id);
      
      const demo_text = document.createElement("p");
      demo_text.id = css.demo_id;
      demo_text.innerHTML = "Change the appearance of this text through the options below.";
      container.appendChild(demo_text);
      
      container.appendChild(form);
  
      const br_tag = document.createElement("br");
      container.appendChild(br_tag);
  
      const change_style_btn = document.createElement("button");
      change_style_btn.id = "css_submit";
      change_style_btn.innerHTML = "Change style";
      container.appendChild(change_style_btn);
      change_style_btn.addEventListener("click", css.handleChange);
  
      const code_desc = document.createElement("p");
      code_desc.innerHTML = "Below are the rules for the CSS styles";
      container.appendChild(code_desc);
  
      const code_block = document.createElement("code");
      code_block.id = "css_rules";
      container.appendChild(code_block);
    }
  };

  // function convertIntoRules(rules_obj){
  //   let rules_code = `_ {\n`;
  //   for (const prop in rules_obj){
  //     if (rules_obj[prop]){
  //       rules_code += `${prop}: ${rules_obj[prop]};\n`;
  //     }
  //   }
  //   rules_code += `}`;
  //   return rules_code;
  // }

  // function modifyInlineStyleOfElement(el_id, changes, removes){
  //   const el = document.getElementById(el_id);
  //   const elStyle = el.style;

  //   if (Object.keys(changes).length > 0){
  //     for (const prop in changes){
  //       elStyle.setProperty(prop, changes[prop]);
  //     }
  //     const rules = convertIntoRules(changes);
  //     const codeblock = document.getElementById("css_rules");
  //     codeblock.innerHTML = rules;
  //   }

  //   if (Object.keys(removes).length > 0){
  //     for (const prop of removes){
  //       elStyle.removeProperty(prop);
  //     }
  //   }
  // }

  // function handleCSSFormChange(){
  //   const form = document.getElementById("css_form");
    
  //   const formData = new FormData(form);
  //   const formData_entries = formData.entries();

  //   const changes_obj = {};
  //   for (let kv of formData_entries){
  //     if (kv[0] == "font-size"){
  //       if (parseInt(kv[1]) > 0){
  //         changes_obj[kv[0]] = `${parseInt(kv[1])}px`;
  //       }
  //     } else {
  //       changes_obj[kv[0]] = kv[1];
  //     }
  //   }
  //   const removes_obj = {};
  //   css.misoe("css_demo", changes_obj, removes_obj);
  // }

  // function setup_css_form(container_id){

  //   if (document.getElementById(css.form_id)){ return; }
    
  //   const form = document.createElement("form");
  //   form.id = css.form_id;
  //   const rules = [
  //     [{desc: "Text color", name: "color", type: "color"}, {}],
  //     [{desc: "Font size", name: "font-size", type: "number"}, {min: 6, max: 50, value: 16}],
  //     [{desc: "Font (family)", name: "font-family", type: "text"}, {"font-family": ''}]
  //   ];

  //   for (const rule of rules){
  //     const label = document.createElement("label");
  //     label.setAttribute("for", rule[0].name);
  //     label.innerHTML = rule[0].desc;
  //     form.appendChild(label);
      
  //     const input = document.createElement("input");
  //     input.name = rule[0].name;
  //     input.type = rule[0].type;
      
  //     if (Object.keys(rule[1]).length > 0){
  //       for (const attr in rule[1]){
  //         input[attr] = rule[1][attr];
  //       }
  //     }
  //     form.appendChild(input);
  //   }

  //   const container = document.getElementById(container_id);
    
  //   const demo_text = document.createElement("p");
  //   demo_text.id = css.demo_id;
  //   demo_text.innerHTML = "Change the appearance of this text through the options below.";
  //   container.appendChild(demo_text);
    
  //   container.appendChild(form);

  //   const br_tag = document.createElement("br");
  //   container.appendChild(br_tag);

  //   const change_style_btn = document.createElement("button");
  //   change_style_btn.id = "css_submit";
  //   change_style_btn.innerHTML = "Change style";
  //   container.appendChild(change_style_btn);
  //   change_style_btn.addEventListener("click", css.handleChange);

  //   const code_desc = document.createElement("p");
  //   code_desc.innerHTML = "Below are the rules for the CSS styles";
  //   container.appendChild(code_desc);

  //   const code_block = document.createElement("code");
  //   code_block.id = "css_rules";
  //   container.appendChild(code_block);
  // }
