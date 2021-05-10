# Company API Client
## About
This is a simple front-end application developed with VueJS to interact with an API repo.

## Installation
Clone repository
```
$ git clone https://github.com/alesonyeagwa/companyapi-client-challenge.git
```
## Project setup
In the root folder of the project run the following to install required packages.
```
npm install
```
It is assumed that the backend of this application has been set up appropriately as it's URL will be this applications's API endpoint. The backend repo can be found [here](https://github.com/alesonyeagwa/companyapi-challenge.git)

To set up the API endpoint, open the file at `src` > `bootstrap.js`, and update the API endpoint in following line accordingly.
```
window.axios.defaults.baseURL = '{Your API Endpoint}'
```
### Compiles and hot-reloads for development
```
npm run serve
```

The command above produces a URL which can be accessible through a browser
### Compiles and minifies for production
```
npm run build
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## Issues

If you discover an issue within this project, please you're more than welcome to submit a pull request, or if you're not feeling up to it - create an issue so someone else can pick it up.

## License

This project is an open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
