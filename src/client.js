import elasticsearch from "elasticsearch";

export default new elasticsearch.Client({
  host: "http://localhost:9200",
  apiVersion: "6.1",
  log: "debug"
});
