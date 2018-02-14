export default {
  mappings: {
    _doc: {
      properties: {
        id: { type: "keyword" },
        projectLabel: { type: "keyword" },
        aligner: { type: "keyword" },
        sample: { type: "keyword" },
        outfile: { type: "text" },
        name: { type: "keyword" },
        platform: { type: "keyword" },
        version: { type: "long" },
        type: { type: "keyword" },
        infile: { type: "text" }
      }
    }
  }
};
