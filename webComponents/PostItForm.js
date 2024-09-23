"use strict";
import { getCSSVar } from "../helperFunctions/helpers.js";

class PostItForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          form > * {
            width: 280px;
            }
            form {
              border: 1px solid black;
              box-shadow: 20px 20px 50px ${
                this.getAttribute("box-shadow") ?? "#73a383"
              };
              display: flex;
              flex-direction: column;
              background: ${
                this.getAttribute("background") ?? "rgb(175, 197, 197)"
              };
              gap: 4px;
              align-items: center;
              padding: 15px;
              border-radius: 5%;
            }
            form > div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;
            }
            form > button {
              width: 54px;
              }
            label {
              cursor: ${getCSSVar("", "--3d-pointer")};
            }
          input, textarea {
            cursor: ${getCSSVar("", "--edit-pen-cursor")};
          }
          button {
            cursor: ${getCSSVar("", "--hand-cursor")};
          }
        </style>
        <form id="form">
        <p><slot name="title-in-form">Default text in form</slot></p>
          <input type="text" id="header-input" maxlength="35" required placeholder="header" />
          <textarea name="paragraph" id="text" placeholder="Enter text here"></textarea>
          <div class="color-picker">
            <label>Background color:</label>
            <input type="color" id="color-input" value="#b1bcf8" />
          </div>
          <button type="submit">Add</button>
        </form>
      `;

    // Clone the template content and append it to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  handleInputClick(event) {
    console.log("It works!", event);
  }

  // Cleanup when the element is removed from the DOM
  connectedCallback() {
    this.headerInput = this.shadowRoot.getElementById("header-input");
    if (this.headerInput) {
      this.headerInput.addEventListener("click", this.handleInputClick);
    }
  }

  // Lifecycle method called when the element is disconnected from the DOM
  disconnectedCallback() {
    if (this.headerInput) {
      this.headerInput.removeEventListener("click", this.handleInputClick);
    }
  }
  static get observedAttributes() {
    return ["background"];
  }

  // Callback when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "background") {
      this.form = this.shadowRoot.getElementById("form");
      this.form.style.backgroundColor = newValue;
      // this.shadowRoot.style.backgroundColor = newValue; // Update background color
    }
  }
}

customElements.define("post-it-form", PostItForm);
