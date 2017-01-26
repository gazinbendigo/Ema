Package.describe({
  name: 'ben:accounts-adfs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A login handler which uses the headers returned from an ADFS login',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  Npm.depends({
    'memory-cache': '0.1.4'
  });

  api.use([
    'accounts-base',
    'ecmascript',
    'check',
    'underscore',
    'webapp',
    'random',
    'meteorhacks:inject-initial'
  ], ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.imply('meteorhacks:inject-initial', 'client');

  api.addFiles('accounts-adfs.js', 'server');

  api.addFiles('accounts-adfs-client.js', 'client');
});


