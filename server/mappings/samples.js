export default {
  mappings: {
    _doc: {
      properties: {
        source: { type: "keyword" },
        projectLabel: { type: "text" },
        role: { type: "keyword" },
        description: { type: "text" },
        cancer: { type: "keyword" },
        version: { type: "long" },
        name: { type: "keyword" }
      }
    }
  }
};
