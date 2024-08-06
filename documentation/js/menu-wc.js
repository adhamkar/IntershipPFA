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
                    <a href="index.html" data-type="index-link">library-management-v2 documentation</a>
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-c5ce12696f6ca50669a12d48d30e0b29adf463bfdae9e2c59e9171a1cdd20ad18fe2f3a980fa80999684a81db2e1987f73bc5ca59619b2e02a8458534664d07a"' : 'data-bs-target="#xs-components-links-module-AppModule-c5ce12696f6ca50669a12d48d30e0b29adf463bfdae9e2c59e9171a1cdd20ad18fe2f3a980fa80999684a81db2e1987f73bc5ca59619b2e02a8458534664d07a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c5ce12696f6ca50669a12d48d30e0b29adf463bfdae9e2c59e9171a1cdd20ad18fe2f3a980fa80999684a81db2e1987f73bc5ca59619b2e02a8458534664d07a"' :
                                            'id="xs-components-links-module-AppModule-c5ce12696f6ca50669a12d48d30e0b29adf463bfdae9e2c59e9171a1cdd20ad18fe2f3a980fa80999684a81db2e1987f73bc5ca59619b2e02a8458534664d07a"' }>
                                            <li class="link">
                                                <a href="components/AjouterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AjouterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoriesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryProfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmpruntsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpruntsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EtudiantComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EtudiantComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LivreComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LivreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LivreProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LivreProfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PowerBiComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PowerBiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RservesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RservesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bibliothecaire.html" data-type="entity-link" >Bibliothecaire</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Emprunte.html" data-type="entity-link" >Emprunte</a>
                            </li>
                            <li class="link">
                                <a href="classes/Etudiant.html" data-type="entity-link" >Etudiant</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/Livre.html" data-type="entity-link" >Livre</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reserve.html" data-type="entity-link" >Reserve</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AjouterService.html" data-type="entity-link" >AjouterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AjouterServiceService.html" data-type="entity-link" >AjouterServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryServiceService.html" data-type="entity-link" >CategoryServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmpruntService.html" data-type="entity-link" >EmpruntService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EtudiantService.html" data-type="entity-link" >EtudiantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LivreService.html" data-type="entity-link" >LivreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PDFsService.html" data-type="entity-link" >PDFsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceService.html" data-type="entity-link" >ServiceService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});