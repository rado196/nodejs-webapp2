const concurrently = require('concurrently');

concurrently(
  [
    { name: 'app1', command: 'sleep 1 && npm run app -- app1 3001' },
    { name: 'app2', command: 'sleep 2 && npm run app -- app2 3002' },
    { name: 'app3', command: 'sleep 3 && npm run app -- app3 3003' },
    { name: 'app4', command: 'sleep 4 && npm run app -- app4 3004' },
    { name: 'app5', command: 'sleep 5 && npm run app -- app5 3005' },
    { name: 'app6', command: 'sleep 6 && npm run app -- app6 3006' },
  ],
  {
    prefix: '[{name}] ',
    prefixColors: ['magenta', 'cyan', 'red', 'green', 'yellow', 'blue', 'gray'],
    killOthers: ['failure', 'success'],
    restartTries: -1,
    restartAfter: 200,
    restartDelay: 500,
  }
).result.then(
  function () {},
  function () {}
);
