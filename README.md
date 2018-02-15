# configuration

![example](example.png)

## env variables

the following environment variables must be set:

```
MONGO_URI
```

optionally:

```
SSE_PORT
```

## monitors.js

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
npm i
npm start
```

### web client

```
cd web
npm i
npm start
```
