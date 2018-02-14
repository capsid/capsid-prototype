export default {
  mappings: {
    _doc: {
      properties: {
        id: { type: "keyword" },
        genome: { type: "long" },
        projectLabel: { type: "keyword" },
        sequence: { type: "text" },
        sample: { type: "keyword" },
        refStart: { type: "long" },
        alignment: { type: "keyword" },
        readId: { type: "keyword" },
        refEnd: { type: "long" },
        platform: { type: "keyword" },
        mapq: { type: "long" },
        pairEnd: { type: "long" },
        minQual: { type: "long" },
        MD: { type: "text" },
        cigar: { type: "long" },
        mismatch: { type: "long" },
        miscalls: { type: "long" },
        readLength: { type: "long" },
        alignScore: { type: "long" },
        mapsGene: { type: "text" },
        qqual: { type: "text" },
        refStrand: { type: "long" },
        alignLength: { type: "long" },
        sequencingType: { type: "keyword" },
        avgQual: { type: "long" }
      }
    }
  }
};
