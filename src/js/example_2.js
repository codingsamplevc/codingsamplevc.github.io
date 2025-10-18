// JavaScript example 2: Interactive CSS style options

class CSSPlayground {
  #classNames = {
    container: "cssplayground-container",
    containerBtn: "cssplayground-container-btn",
    stylingForm: "cssplayground-form",
    demoContainer: "cssplayground-demo-container",
    demoText: "cssplayground-demo-text",
    applyStylingBtn: "cssplayground-apply-styling-btn",
    cssCodeDescription: "cssplayground-css-code-description",
    cssCodeBlock: "cssplayground-css-code-block"
  };
  #elements = {
    container: null,
    containerBtn: null,
    stylingForm: null,
    demoContainer: null,
    demoText: null,
    applyStylingBtn: null,
    cssCodeDescription: null,
    cssCodeBlock: null
  };
  #stylingOptions = [
    [{desc: "Text color", name: "color", type: "color"}, {}],
    [{desc: "Font size", name: "font-size", type: "number"}, {min: 6, max: 50, value: 16}],
    [{desc: "Font (family)", name: "font-family", type: "text"}, {"font-family": ''}]
  ];

  constructor() {
    this.#elements.container = document.querySelector(`.${this.#classNames.container}`);
    this.#elements.containerBtn = document.querySelector(`.${this.#classNames.containerBtn}`);
    this.#elements.containerBtn.addEventListener("click", () => this.#setup());
  }

  #setup() {
    if (this.#elements.container) {

      if (this.#elements.stylingForm){ return; }
      
      const form = document.createElement("form");
      form.classList.add(this.#classNames.stylingForm);
      this.#elements.stylingForm = form;
      
      // const rules = [
      //   [{desc: "Text color", name: "color", type: "color"}, {}],
      //   [{desc: "Font size", name: "font-size", type: "number"}, {min: 6, max: 50, value: 16}],
      //   [{desc: "Font (family)", name: "font-family", type: "text"}, {"font-family": ''}]
      // ];
  
      for (const rule of this.#stylingOptions){
        const label = document.createElement("label");
        label.innerHTML = rule[0].desc;
        label.setAttribute("for", rule[0].name);
        form.appendChild(label);
        
        const input = document.createElement("input");
        input.name = rule[0].name;
        input.type = rule[0].type;
        
        if (Object.keys(rule[1]).length > 0){
          for (const attr in rule[1]){
            input[attr] = rule[1][attr];
          }
        }
        label.appendChild(input);
      }
  
      const container = this.#elements.container;
  
      const demoContainer = document.createElement("div");
      demoContainer.classList.add(this.#classNames.demoContainer);
      this.#elements.demoContainer = demoContainer;
      container.appendChild(demoContainer);
      
      const demoText = document.createElement("p");
      demoText.classList.add(this.#classNames.demoText);
      this.#elements.demoText = demoText;
      demoContainer.appendChild(demoText);
      demoText.innerHTML = "Change the appearance of this text through the inputs.";
      
      container.appendChild(form);
  
      const BR_TAG = document.createElement("br");
      container.appendChild(BR_TAG);
  
      const applyStylingButton = document.createElement("button");
      applyStylingButton.classList.add(this.#classNames.applyStylingBtn);
      this.#elements.applyStylingBtn = applyStylingButton;
      applyStylingButton.innerHTML = "Apply styling";
      container.appendChild(applyStylingButton);
      applyStylingButton.addEventListener("click", () => this.#applyStyling());
  
      const cssCodeDescription = document.createElement("p");
      cssCodeDescription.classList.add(this.#classNames.cssCodeDescription);
      this.#elements.cssCodeDescription = cssCodeDescription;
      cssCodeDescription.innerHTML = "Below are the rules for the CSS styles";
      container.appendChild(cssCodeDescription);
  
      const cssCodeBlock = document.createElement("code");
      cssCodeBlock.classList.add(this.#classNames.cssCodeBlock);
      this.#elements.cssCodeBlock = cssCodeBlock;
      cssCodeBlock.style.display = "block";
      cssCodeBlock.style.whiteSpace = "pre";
      container.appendChild(cssCodeBlock);
    }
  }

  #applyStyling() {
    const form = this.#elements.stylingForm;
    if (form) {
      const formData = new FormData(form);
      const formDataEntries = formData.entries();
      const changes = {};
      for (let kv of formDataEntries) {
        if (kv[0] == "font-size") {
          if (parseInt(kv[1]) > 0) {
            changes[kv[0]] = `${parseInt(kv[1])}px`;
          }
        } else {
          changes[kv[0]] = kv[1];
        }
      }
      const removes = {};
      this.#modifyChanges(changes, removes);
    }
  }

  #modifyChanges(changes, removes) {
    const demoText = this.#elements.demoText;
    const demoTextStyle = demoText.style;
    if (Object.keys(changes).length > 0) {
      for (const prop in changes) {
        demoTextStyle.setProperty(prop, changes[prop]);
      }
      const rules = this.#convertChangesToRules(changes);
      const cssCodeBlock = this.#elements.cssCodeBlock;
      cssCodeBlock.innerHTML = rules;
    }

    if (Object.keys(removes).length > 0) {
      for (const prop of removes) {
        demoTextStyle.removeProperty(prop);
      }
    }
  }

  #convertChangesToRules(changes) {
    let rules = `_ {\n`;
    for (const prop in changes) {
      if (changes[prop]) {
        rules += `\t${prop}: ${changes[prop]};\n`;
      }
    }
    rules += `}`;
    return rules;
  }
}

new CSSPlayground();
