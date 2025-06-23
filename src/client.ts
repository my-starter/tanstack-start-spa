// import { registerSW } from 'virtual:pwa-register';

// registerSW({
//   immediate: true,
//   onRegisteredSW: (swUrl, registration) => {
//     console.log('SW registered: ', swUrl);
//     registration?.addEventListener('updatefound', () => {
//       const newWorker = registration.installing;
//       newWorker?.addEventListener('statechange', () => {
//         if (
//           newWorker?.state === 'installed' &&
//           navigator.serviceWorker.controller
//         ) {
//           console.log('New content is available; please refresh.');
//         }
//       });
//     });
//   },
//   onRegisterError: (error) => {
//     console.error('Error during service worker registration:', error);
//   },
// });

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' });
//   });
// }
