'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-91ec6c933084121100cf9b8440a68719ca2f1492c96f3a66fe1d06360eb58a1793b498d029b5fdfd341cb3025c3c6d525aea96b29a4390781350b2da1e00f454"' : 'data-target="#xs-components-links-module-AppModule-91ec6c933084121100cf9b8440a68719ca2f1492c96f3a66fe1d06360eb58a1793b498d029b5fdfd341cb3025c3c6d525aea96b29a4390781350b2da1e00f454"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-91ec6c933084121100cf9b8440a68719ca2f1492c96f3a66fe1d06360eb58a1793b498d029b5fdfd341cb3025c3c6d525aea96b29a4390781350b2da1e00f454"' :
                                            'id="xs-components-links-module-AppModule-91ec6c933084121100cf9b8440a68719ca2f1492c96f3a66fe1d06360eb58a1793b498d029b5fdfd341cb3025c3c6d525aea96b29a4390781350b2da1e00f454"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BackofficeModule.html" data-type="entity-link" >BackofficeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BackofficeModule-e8867cb4ca1ba609ad268c3a9fc7154c48e0c552c06b435b2e3bd789e767afd2aad82c4c9597ee897d3b53e273412b6d5a7d0f9f04b8776f5fccbe3213ba60c0"' : 'data-target="#xs-components-links-module-BackofficeModule-e8867cb4ca1ba609ad268c3a9fc7154c48e0c552c06b435b2e3bd789e767afd2aad82c4c9597ee897d3b53e273412b6d5a7d0f9f04b8776f5fccbe3213ba60c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BackofficeModule-e8867cb4ca1ba609ad268c3a9fc7154c48e0c552c06b435b2e3bd789e767afd2aad82c4c9597ee897d3b53e273412b6d5a7d0f9f04b8776f5fccbe3213ba60c0"' :
                                            'id="xs-components-links-module-BackofficeModule-e8867cb4ca1ba609ad268c3a9fc7154c48e0c552c06b435b2e3bd789e767afd2aad82c4c9597ee897d3b53e273412b6d5a7d0f9f04b8776f5fccbe3213ba60c0"' }>
                                            <li class="link">
                                                <a href="components/BackofficeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackofficeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BackofficeRoutingModule.html" data-type="entity-link" >BackofficeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FrontofficeModule.html" data-type="entity-link" >FrontofficeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FrontofficeModule-9be6a73ad68b90138b43f78e74490d07bdbc24210c4b5a627d93c1d92815ae88c7e8810bcc0ab6a5612374dfa0068c1bd942de90e326647574755f2f941dfabc"' : 'data-target="#xs-components-links-module-FrontofficeModule-9be6a73ad68b90138b43f78e74490d07bdbc24210c4b5a627d93c1d92815ae88c7e8810bcc0ab6a5612374dfa0068c1bd942de90e326647574755f2f941dfabc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FrontofficeModule-9be6a73ad68b90138b43f78e74490d07bdbc24210c4b5a627d93c1d92815ae88c7e8810bcc0ab6a5612374dfa0068c1bd942de90e326647574755f2f941dfabc"' :
                                            'id="xs-components-links-module-FrontofficeModule-9be6a73ad68b90138b43f78e74490d07bdbc24210c4b5a627d93c1d92815ae88c7e8810bcc0ab6a5612374dfa0068c1bd942de90e326647574755f2f941dfabc"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FrontofficeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FrontofficeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FrontofficeRoutingModule.html" data-type="entity-link" >FrontofficeRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});