import client from "../src/client";
import projects from "./projects";

client.indices.create({
  index: "projects",

  body: { mappings: { _doc: projects } }
});
