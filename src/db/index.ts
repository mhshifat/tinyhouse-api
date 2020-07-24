import { connect } from "mongoose";

export const CBD = (uri: string) =>
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    useFindAndModify: false,
  });
