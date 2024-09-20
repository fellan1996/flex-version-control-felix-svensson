import { getCSSVar } from "../helperFunctions/helpers.js";

const attributes = {
  WIDTH: "width",
  HEIGHT: "height",
  BACKGROUND: "background",
  TRANSITION: "transition",
};

function isValueInPixels(value) {
  const regex = /[0-9]+(?:\.[0-9]+)?(?=px)/;

  return regex.test(value);
}

const defaultStyles = {
  width: "100%",
  height: "200px",
  transition: "height 200ms",
  background: "none",
};

class CollapseAndExpand extends HTMLElement {
  #parentContainer = null;
  static observedAttributes = [
    attributes.WIDTH,
    attributes.HEIGHT,
    attributes.BACKGROUND,
    attributes.TRANSITION,
  ];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = ` <div class="parent-container">
        <style>
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: ${getCSSVar("", "--gap-body")};
                width: 100%;
                height: fit-content;
                }
                .shadow-wrapper {
                border-radius: 100%;
                position: relative;
                bottom: var(--gap-body);
                border: 1px solid gray;
                box-shadow: 2px 3px 10px var(--primary-green);
                transition: border 100ms, box-shadow 500ms, transform 500ms; /* Add transition to the border and shadow */
                transition-timing-function: cubic-bezier(0.6, 0.04, 0.77, 0.45);
                width: 25px;
                height: 25px;
                overflow: hidden;
                cursor: ${getCSSVar("", "--hand-cursor") ?? auto};
            }
            /* Actual img that rotates */
            #hide-header-div-btn {
                position: absolute;
                background: radial-gradient(farthest-corner at 2px 2px, #9bc7a6, var(--primary-green));
                transition-property: transform;
                transition-duration: 500ms;
                transition-timing-function: cubic-bezier(0.6, 0.04, 0.77, 0.45);
                width: 100%; /* Match the size of the parent */
                height: 100%;
            }
            .shadow-wrapper:hover {
                border: 1px solid black;
            }
            #hide-header-div-btn.expanded:active{ 
                background: radial-gradient(farthest-corner at 20px 20px, #9bc7a6, var(--primary-green));
            }
            #hide-header-div-btn.collapsed:active{ 
              background: radial-gradient(farthest-corner at 2px 2px, #9bc7a6, var(--primary-green));
            }
            #hide-header-div-btn.collapsed {
                transform: rotate(180deg);
                background: radial-gradient(farthest-corner at 20px 20px, #9bc7a6, var(--primary-green));
            }
            .shadow-wrapper:has(#hide-header-div-btn.expanded) {
                transform: translateY(-50%);
            }
            </style>
            <slot name="container"></slot>
        </div>
            <div class="shadow-wrapper">
                <img id="hide-header-div-btn" class="expanded" src="../pictures/icons8-expand-24.png" alt="arrow" />
            </div>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#parentContainer = shadow.querySelector(".parent-container");

    const width = this.getAttribute(attributes.WIDTH);
    if (width && isValueInPixels(width)) {
      this.#parentContainer.style.width = width;
    } else {
      this.#parentContainer.style.width = defaultStyles.width;
      console.error(
        `Please set a ${attributes.WIDTH} attribute to the resizer tag.`
      );
    }

    const height = this.getAttribute(attributes.HEIGHT);
    if (height && isValueInPixels(height)) {
      this.#parentContainer.style.height = height;
    } else {
      this.#parentContainer.style.height = defaultStyles.height;
      console.error(
        `Please set a ${attributes.HEIGHT} attribute to the resizer tag.`
      );
    }

    const background = this.getAttribute(attributes.BACKGROUND);
    if (background && typeof background === "string") {
      this.#parentContainer.style.background = background;
    } else {
      this.#parentContainer.style.background = defaultStyles.background;
      console.error(
        `Please set a ${attributes.BACKGROUND} attribute to the resizer tag.`
      );
    }

    const transition = this.getAttribute(attributes.TRANSITION);
    if (transition && typeof transition === "string") {
      this.#parentContainer.style.transition = transition;
    } else {
      this.#parentContainer.style.transition = defaultStyles.transition;
      console.error(
        `Please set a ${attributes.TRANSITION} attribute to the resizer tag.`
      );
    }

    this.#parentContainer.className = "expanded";
    const hideContainerBtn = shadow.getElementById("hide-header-div-btn");
    hideContainerBtn.addEventListener("click", () => {
      if (this.#parentContainer.className === "collapsed") {
        this.#parentContainer.className = "expanded";
        hideContainerBtn.className = "expanded";
        if (height && isValueInPixels(height)) {
          this.#parentContainer.style.height = height;
        } else {
          this.#parentContainer.style.height = defaultStyles.height;
          console.error(
            `Please set a ${attributes.HEIGHT} attribute to the resizer tag.`
          );
        }
      } else {
        this.#parentContainer.className = "collapsed";
        hideContainerBtn.className = "collapsed";
        this.#parentContainer.style.height = "0px";
      }
    });
  }

  connectedCallback() {
    // const hideContainerBtn = this.shadowRoot.getElementById("hide-header-div-btn");
    // hideContainerBtn.addEventListener('click', () => this.toggleCollapse());
  }
  toggleCollapse() {
    const container = this.shadowRoot.querySelector("slot[name='container']");
    if (container.classList.contains("collapsed")) {
      container.classList.remove("collapsed");
      container.classList.add("expanded");
    } else {
      container.classList.remove("expanded");
      container.classList.add("collapsed");
    }
  }
}

customElements.define('collapse-and-expand', CollapseAndExpand);