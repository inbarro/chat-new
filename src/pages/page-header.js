import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';

export class PageHeader extends PageElement {
  render() {
    return html`<h1 class="my_header"> This is header </h1>`;
  }
}

customElements.define('page-header', PageHeader);
