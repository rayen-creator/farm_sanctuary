var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","loadChildren":"./components/frontoffice/frontoffice.module#FrontofficeModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/components/frontoffice/frontoffice-routing.module.ts","module":"FrontofficeRoutingModule","children":[{"path":"","component":"FrontofficeComponent","children":[{"path":"","redirectTo":"home","pathMatch":"full"},{"path":"home","component":"HomeComponent"}]}],"kind":"module"}],"module":"FrontofficeModule"}]},{"path":"admin","loadChildren":"./components/backoffice/backoffice.module#BackofficeModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/components/backoffice/backoffice-routing.module.ts","module":"BackofficeRoutingModule","children":[{"path":"","component":"BackofficeComponent","children":[]}],"kind":"module"}],"module":"BackofficeModule"}]}],"kind":"module"}]}