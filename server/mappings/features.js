export default {
  mappings: {
    _doc: {
      properties: {
        id: { type: "keyword" },
        genome: { type: "long" },
        uid: { type: "text" },
        locusTag: { type: "keyword" },
        operator: { type: "keyword" },
        strand: { type: "long" },
        end: { type: "long" },
        name: { type: "keyword" },
        start: { type: "long" },
        type: { type: "keyword" },
        geneId: { type: "long" }
      }
    }
  }
};
