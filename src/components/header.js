import { html, css } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
// import { PageElement } from '../helpers/page-element';
import { LitElement } from './base';

export class Header extends LitElement {


  static get styles() {
    return css`
        .top {
           margin: 0px;
           padding: 0px;
           border: 0px;
        }
    
    `};

  render() {
    return html`<img class="top" src="../../images/banner.gif">`;
  }
}

customElements.define('component-header', Header);
