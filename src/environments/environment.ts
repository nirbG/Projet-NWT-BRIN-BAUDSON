// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      allComics: '/comics',
      someComics: '/comics/:start/:nb',
      oneComics: '/comics/:isbn',
      addComics: '/comics',
      putComics: '/comics/:isbn',
      delComics: '/comics/:isbn',
      allHeros: '/heros',
      someHeros: '/heros/:start/:nb',
      oneHero: '/heros/:id',
      addHero: '/heros',
      putHero: '/heros/:id',
      delHero: '/heros/:id',
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
