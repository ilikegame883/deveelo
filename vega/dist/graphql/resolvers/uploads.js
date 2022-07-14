"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadedFiles = [];
const uploadsResolvers = {
    Mutation: {
        async singleUpload(_parent, { file, type }, { res, payload }) {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
        },
    },
};
exports.default = uploadsResolvers;
//# sourceMappingURL=uploads.js.map