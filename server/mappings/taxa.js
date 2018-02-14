export default {
  mappings: {
    _doc: {
      properties: {
        id: { type: "keyword" },
        commonName: { type: "keyword" },
        left: { type: "long" },
        parent: { type: "long" },
        rank: { type: "keyword" },
        right: { type: "long" },
        scentificiName: { type: "keyword" }
      }
    }
  }
};
