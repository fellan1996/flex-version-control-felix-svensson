"use strict";
import { getCSSVar } from "../helperFunctions/helpers.js";

class RadioInputs extends HTMLElement {
  #selectedInput = null;
  #checkedByDefault = null;
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    const labelsAndValuesArray = this.getAttribute("labelsAndValues").split(";");
    const labelsArray = [];
    const valuesArray = [];
    labelsAndValuesArray.map(labelAndValue => {
        const [label, value] = labelAndValue.split(',');
        labelsArray.push(label);
        valuesArray.push(value);
    })
    const fillColor = this.getAttribute("fillColor");
    const name = this.getAttribute("name");
    this.#checkedByDefault =
      this.getAttribute("checkedByDefault").toLowerCase();
    template.innerHTML = `
        <style>
            :host {
              min-width: fit-content; 
              max-width: 265px; 
              width: 90%;
            }
            .form-control {
                font-size: 1rem;
                font-weight: 400;
                cursor: var(--hand-cursor);
                padding-right: 7px;
                margin-right: -7px;

            }
            input[type="radio"] {
                -webkit-appearance: none;
                cursor: var(--hand-cursor);
                appearance: none;
                margin: 0;
                margin-right: 0.3rem;
                font: inherit;
                width: 1.15em;
                height: 1.15em;
                border: 0.15em solid currentColor;
                border-radius: 100%;
                display: grid;
                place-content: center;
                background-color: rgb(168, 168, 168);
            }
            input[type="radio"]::before {
                content: "";
                width: 0.65em;
                height: 0.65em;
                border-radius: 100%;
                transform: scale(0);
                transition: 120ms transform ease-in-out;
                box-shadow: inset 1em 1em ${fillColor};
                background-color: CanvasText;
            }
            .radio-group-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            input[type="radio"]:checked::before {
                 transform: scale(1);
            }
            .label-and-radio-input {
                display: flex;
                flex-direction: row;
                width: fit-content;
                gap: 0.3rem;
                &:hover {
                    color: ${fillColor};
                }
            }
        </style>
        <div class="radio-group-container">
        ${labelsAndValuesArray
          .map((labelAndValue, index) => {
            const [label, value] = labelAndValue.split(',');
            return `
            <div class="label-and-radio-input">
                <label class="form-control" for="${value}-${index}">
                ${label}
                </label>
                <input
                type="radio"
                name="${name}"
                id="${value}-${index}"
                value="${value}"
                />
            </div>`;
          })
          .join("")}
        </div>
      `;
      shadow.appendChild(template.content.cloneNode(true));

    const defaultRadio = shadow.querySelector(
      `input[value="${this.#checkedByDefault}"]`
    );
    if (defaultRadio) {
      defaultRadio.checked = true;
    } else {
        console.log("nope, not true yet", this.#checkedByDefault)
    }
    const radioGroupContainer = shadow.querySelector(".radio-group-container");
    const formElement = document.querySelector("post-it-form");
    radioGroupContainer.addEventListener("change", function (event) {
      // Check if the target of the event is an input element with type radio
      if (event.target && event.target.matches('input[type="radio"]')) {
        const selectedColor = event.target.value;
        formElement.setAttribute("background", selectedColor);
      }
    });

  }

  connectedCallback() {
  }

  disconnectedCallback() {}
  static get observedAttributes() {
    // return ["background"];
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define("radio-inputs", RadioInputs);
