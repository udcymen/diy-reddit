// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBxQEYmav_SIqMufHfK0y2RkQeNWl7W-Kg",
    authDomain: "diy-reddit-257012.firebaseapp.com",
    databaseURL: "https://diy-reddit-257012.firebaseio.com",
    projectId: "diy-reddit-257012",
    storageBucket: "diy-reddit-257012.appspot.com",
    messagingSenderId: "160290246040",
    appId: "1:160290246040:web:1e698cef3bfcdb094befed",
    measurementId: "G-P5FTVX8NHN"
  },
  toast: {
    timeOut: 10000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
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
