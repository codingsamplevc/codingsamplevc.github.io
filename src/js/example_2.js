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
    demoText_1: null,
    applyStylingBtn: null,
    cssCodeDescription: null,
    cssCodeBlock: null
  };
  #stylingOptions = [
    { desc: "Text color", name: "color", type: "color", val: null },
    { desc: "Font size", name: "font-size", type: "number", val: { min: 6, max: 50, value: 16 } },
    { desc: "Font (family)", name: "font-family", type: "text", val: {"font-family": ''} }
  ];

  constructor() {
    if (!(document.querySelector(`.${this.#classNames.container}`)) || document.querySelector(`.${this.#classNames.stylingForm}`)) { return; }
    this.#elements.container = document.querySelector(`.${this.#classNames.container}`);
    this.#elements.containerBtn = document.querySelector(`.${this.#classNames.containerBtn}`);
    this.#elements.containerBtn.addEventListener("click", () => this.#setup());
  }

  #setup() {
    if (document.querySelector(`.${this.#classNames.demoContainer}`)) { return; }

    const container = this.#elements.container;

    const form = document.createElement("form");
    form.classList.add(this.#classNames.stylingForm);
    this.#elements.stylingForm = form;
    container.appendChild(form);

    for (const rule of this.#stylingOptions) {
      const label = document.createElement("label");
      label.setAttribute("for", rule.name);
      label.innerHTML = rule.desc;
      form.appendChild(label);

      const input = document.createElement("input");
      input.name = rule.name;
      input.type = rule.type;
      label.appendChild(input);

      if (rule.val) {
        for (const attr in rule.val) {
          input[attr] = rule.val[attr];
        }
      }
    }
  
    const applyStylingButton = document.createElement("button");
    this.#elements.applyStylingBtn = applyStylingButton;
    // applyStylingButton.classList.add(this.#classNames.applyStylingBtn);
    applyStylingButton.innerHTML = "Apply styling";
    applyStylingButton.addEventListener("click", () => this.#applyStyling());
    container.appendChild(applyStylingButton);

    const cssCodeDescription = document.createElement("p");
    // cssCodeDescription.classList.add(this.#classNames.cssCodeDescription);
    // this.#elements.cssCodeDescription = cssCodeDescription;
    cssCodeDescription.innerHTML = "Below are the rules for the CSS styles";
    container.appendChild(cssCodeDescription);

    const cssCodeBlock = document.createElement("code");
    this.#elements.cssCodeBlock = cssCodeBlock;
    // cssCodeBlock.classList.add(this.#classNames.cssCodeBlock);
    // this.#elements.cssCodeBlock = cssCodeBlock;
    cssCodeBlock.style.display = "block";
    cssCodeBlock.style.whiteSpace = "pre";
    container.appendChild(cssCodeBlock);
    
    const demoContainer = document.createElement("div");
    this.#elements.demoContainer = demoContainer;
    demoContainer.classList.add(this.#classNames.demoContainer);
    container.appendChild(demoContainer);

    const demoText_1 = document.createElement("p");
    this.#elements.demoText_1 = demoText_1;
    demoText_1.classList.add(this.#classNames.demoText);
    demoText_1.innerHTML = "First paragraph element inside demo container.";
    demoContainer.appendChild(demoText_1);
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
    const demoText_1 = this.#elements.demoText_1;
    const demoTextStyle = demoText_1.style;
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
