class PostItForm extends HTMLElement {
  constructor() {
    super();

    // Create a template for the form
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          form > * {
            width: 280px;
          }
          form {
            display: flex;
            flex-direction: column;
            background-color: rgb(175, 197, 197);
            gap: 4px;
            margin-top: 15px;
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
        </style>
        <form id="form">
          <input type="text" id="header-input" maxlength="35" required placeholder="header" />
          <textarea name="paragraph" id="text" placeholder="Enter text here"></textarea>
          <div class="color-picker">
            <label>Background color:</label>
            <input type="color" id="color-input" value="#b1bcf8" />
          </div>
          <button type="submit">Add</button>
        </form>
      `;

    // Attach a shadow DOM to the element
    this.attachShadow({ mode: "open" });

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
}

// Define the custom element
customElements.define("post-it-form", PostItForm);
