export default {
  mappings: {
    _doc: {
      properties: {
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
