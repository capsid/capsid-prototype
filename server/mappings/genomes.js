export default {
  mappings: {
    _doc: {
      properties: {
        id: { type: "keyword" },
        accession: { type: "keyword", copy_to: "id" },
        gi: { type: "long" },
        left: { type: "long" },
        length: { type: "long" },
        name: { type: "text" },
        organism: { type: "text" },
        sampleCount: { type: "long" },
        strand: { type: "long" },
        taxonId: { type: "long" },
        taxonomy: { type: "text" },
        version: { type: "long" }
      }
    }
  }
};
