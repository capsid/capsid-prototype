import elasticsearch from "elasticsearch";
import mocker from "mocker-data-generator";

const host = "localhost:9200";
const index = "projects";
const type = "_doc";

const project = {
  id: { chance: "guid" },
  description: { faker: "lorem.sentence" },
  roles: { function: () => ["admin", "owner"] },
  label: { values: ["label", "not label", "another"] },
  version: { faker: 'random.number({"min": 1, "max": 10})' },
  wikiLink: { values: ["http://google.com"] },
  name: { faker: "lorem.word" }
};

const generateData = () => {
  return mocker()
    .schema("projects", project, 50)
    .build();
};

const main = async () => {
  let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
  });

  const { projects } = await generateData();
  await Promise.all(
    projects.map(body =>
      client.create({
        index,
        type,
        id: body.id,
        body
      })
    )
  );
};

main();
