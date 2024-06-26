/*
NOTICE:
This Snow + LavaMoat scuttling integration is currently being used
with an experimental API (https://github.com/LavaMoat/LavaMoat/pull/462).
Changing this code must be done cautiously to avoid breaking the app!
*/

// eslint-disable-next-line import/unambiguous
(function () {
  const log = console.log.bind();
  // eslint-disable-next-line no-undef
  const isWorker = !self.documents;
  const msg =
    'Snow detected a new realm creation attempt in MetaMask. Performing scuttling on new realm';
  Object.defineProperty(self, 'SCUTTLER', {
    value: (realm, scuttle) => {
      if (isWorker) {
        scuttle(realm);
      } else {
        // eslint-disable-next-line no-undef
        self.SNOW((win) => {
          log(msg, win);
          scuttle(win);
        }, realms);
      }
    },
  });
})();
