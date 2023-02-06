const withTM = require('next-transpile-modules')(['@fluss/core', 'three']) // pass the modules you would like to see transpiled

module.exports = withTM({
  ignoreDuringBuilds: true,
  images: {
    domains: [
      'cdn.sanity.io',
      's.gravatar.com',
      'img.youtube.com',
      'googleusercontent.com',
      's0.googleusercontent.com',
      's1.googleusercontent.com',
      's2.googleusercontent.com',
      's3.googleusercontent.com',
      's4.googleusercontent.com',
      's5.googleusercontent.com',
      'lh.googleusercontent.com',
      'lh0.googleusercontent.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'lh7.googleusercontent.com',
      'static.googleusercontent.com',
      'webcache.googleusercontent.com',
    ],
  },
})
