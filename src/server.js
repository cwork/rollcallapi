const app = require('./app');

const port = process.env.PORT || 5150;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
  console.log('Press Ctrl-C to exit.');
});
