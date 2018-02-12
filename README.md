# capsid-api-prototype
next-gen capsid api

Install docker - https://docs.docker.com/docker-for-mac/install/

In one terminal run `docker-compose up`
Go to http://localhost:5601 to see kibana dashboard

In another run:
 - npx babel-node mappings/load_indexes.js
 - MOCK=1 npm start

Then go to http://localhost:8080/playground and run the query:

```
{
  projects {
    hits {
       _source {
        name
      }
    }
  }
}
```