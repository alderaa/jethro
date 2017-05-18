module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '138.68.23.31',
      username: 'root',
      pem: '~/.ssh/id_rsa'
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'jethro',
    path: '~/projects/jethro',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://138.68.23.31',
      MONGO_URL: 'mongodb://localhost/meteor',
      PORT:80
    },

    docker: {
      image: 'abernix/meteord:base',
      imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
