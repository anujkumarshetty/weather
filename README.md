# Weather forcast 

This is a simple react application which fetches data from [metaweather] api displays in a fomated way.
It features 
  - Location search
  - Detailed weather report of a place.
  - Recent searches
 
### Plugins used


| Plugin | README |
| ------ | ------ |
| Material-ui | [<https://material-ui.com/>][PlDb] |
| Axios | [<https://www.npmjs.com/package/axios>][PlGh] |

### Note

Since the [MetaWeather] api header does not contain 'Allow Access-Control-Allow-Origin', the browser throws cors error due to same origin of the request.
In order to solve this problem a proxy server is created inside the project.


### Installation

Weather app requires [Node.js](https://nodejs.org/) v4+ to run.

Install the node module dependencies to start the poxy server.

```sh
$ cd proxyServer
$ npm install
$ node index
```

Once proxy server is ready, up and running. Open a new terminal at the root folder to start the application.

```sh
$ npm install
$ npm start
```

App runs at http://localhost:3000

Auther - AnujKumar R

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [metaweather]: <https://www.metaweather.com/>
