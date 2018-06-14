[![travis](https://img.shields.io/travis/christian-fei/mmonitor.svg?style=flat-square)](https://travis-ci.org/christian-fei/mmonitor) [![npm-version](https://img.shields.io/npm/v/mmonitor.svg?style=flat-square&colorB=007EC6)](https://www.npmjs.com/package/mmonitor) [![npm-dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=flat-square&colorB=44CC11)](package.json) [![standard-js](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![npm-license](https://img.shields.io/npm/l/mmonitor.svg?style=flat-square&colorB=007EC6)](https://spdx.org/licenses/ISC)

# mmonitor

mmonitor is a simple tool to monitor mongo queries and aggregations.

![example](example.png)

## configuration

### env variables

the following environment variables must be set:

```
MONGO_URI
```

optionally:

```
SSE_PORT
```

### monitors.js

create your own `monitors.js` file, starting from `monitors.example.js`.

the structure of a monitor is the following:

```
{
  collection     // string
  type           // 'find', 'distinct', 'aggregate', 'length', 'mapReduce'
  query          // optional query or pipeline
}
```


## installation

```
npm i -g mmonitor
```

## usage

```
MONGO_URI="localhost:27017/work" mmonitor ~/work.monitors.js
MONGO_URI="localhost:27017/project" mmonitor ~/project.monitors.js
```



## development

### installation

```
npm i
npm start
```

### web client

```
cd web
npm i
npm start
```
