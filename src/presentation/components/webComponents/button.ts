/**
 * Button Web Component
 */
class Btn extends HTMLElement {
  private _shadowRoot: ShadowRoot;

  /**
   * Creates an instance of Btn.
   */
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
  }

  /**
   * Returns an array of observed attributes
   */
  public static get observedAttributes(): string[] {
    return ['type', 'icon-type'];
  }

  /**
   * Called when an attribute is changed, appended, removed, or replaced on the element.
   * @param name - The name of the attribute that changed.
   */
  public attributeChangedCallback(name: string): void {
    if (name === 'type' || name === 'icon-type') {
      this.render();
    }
  }

  /**
   * Renders the component
   */
  public render(): void {
    const type = (this.getAttribute('type') ?? "") || 'primary';
    const iconType = (this.getAttribute('icon-type') ?? "") || 'none';

    this._shadowRoot.innerHTML = `
      <style>
        button {
          display: inline-block;
          padding: 8px 12px;
          margin: 10px;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          border:none;
          border-radius: 8px;
          align-items: center;
        }

        /* Primary styles */
        .primary {
          background-color: #24A3FF;
          color: white;
        }

        /* Secondary styles */
        .secondary {
          background-color: #EBEBEC;
          color: #333;
        }

        /* Danger styles */
        .danger {
          background-color: #E32121;
          color: white;
        }

        /* Style for icons */
        .icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
        }

        .trailing .icon {
          right: 8px;
          left: auto;
        }

        .leading-trailing .icon {
          left: 8px;
          right: 8px;
        }
      </style>
      <button class="${type} ${iconType}">
        <span class="icon" style="${iconType === 'trailing' ? 'right: 8px; left: auto;' : ''}" slot="leading"></span>
        <slot></slot>
        <span class="icon" style="${iconType === 'leading' ? 'left: 8px; right: auto;' : ''}" slot="trailing"></span>
      </button>
    `;
  }

  /**
   * Called every time the element is inserted into the DOM.
   */
  public connectedCallback(): void {
    this.render();
    this.addEventListener('click', () => this.dispatchCustomEvent());
  }

  /**
   * Dispatches a custom event
   */
  private dispatchCustomEvent(): void {
    const clickEvent = new CustomEvent('button-click', {
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(clickEvent);
  }
}

window.customElements.define('my-btn', Btn);
export default Btn;
