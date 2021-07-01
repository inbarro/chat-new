import { LitElement, html, css } from './components/base';
import { Logo } from './components';

import config from './config';
import './pages/page-header'
import { attachRouter, urlForName } from './router';
// visit https://components.forter.dev for more
import '@forter/checkbox';
import '@forter/button';
import '@forter/radio';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';

export class App extends LitElement {
  render() {
    const levels = ["Level 1", "Level 2"]
    return html` 
   

      <!-- The main content is added / removed dynamically by the router -->
      <main role="main"></main>


      <footer>
        <div class="container">
          <span
            >Made with ❤️  by Forter Engineering
            ${config.environment !== 'production' ? `(Environment: ${config.environment})` : ''}</span
          >
        </div>
      </footer>`;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    attachRouter(this.querySelector('main'));
  }
}

customElements.define('app-index', App);
