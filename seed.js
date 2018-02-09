import elasticsearch from "elasticsearch";
import mocker from "mocker-data-generator";

const index = "data";
const type = index;

const mapping = {
  properties: {
    id: { type: "text" },
    first: { type: "text", fielddata: true },
    last: { type: "text", fielddata: true },
    gender: { type: "keyword" },
    files: {
      type: "nested",
      properties: {
        file_id: { type: "text" },
        size: { type: "long" }
      }
    }
  }
};

const personSchema = {
  id: { chance: "guid" },
  gender: {
    values: ["male", "female"]
  },
  first: {
    faker: "name.firstName"
  },
  last: {
    faker: "name.lastName"
  }
};

const fileSchema = {
  file_id: { chance: "guid" },
  size: { faker: 'random.number({"min": 50, "max": 10000})' }
};

const generateData = async () => {
  const { people } = await mocker()
    .schema("people", personSchema, 50)
    .build();
  return Promise.all(
    people.map(async x => {
      const { files } = await mocker()
        .schema("files", fileSchema, {
          max: 10,
          min: 0
        })
        .build();
      return { ...x, files };
    })
  );
};

const main = async () => {
  let client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace"
  });

  const exists = await client.indices.exists({ index });
  if (exists) await client.indices.delete({ index });
  await client.indices.create({ index });
  await client.indices.putMapping({ index, type, body: mapping });
  const data = await generateData();
  await Promise.all(
    data.map(body =>
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
