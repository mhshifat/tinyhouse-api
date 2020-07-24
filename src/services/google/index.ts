import { UserDocumentType } from "../../fakeDB/data/users";
import { ModelsType } from "../../models";
import { LoginWithGoogleInput } from "../../types/graphql";

export const Google = {
  login: async (
    token: string,
    data: LoginWithGoogleInput,
    models: ModelsType
  ): Promise<UserDocumentType> => {
    const existingUser = await models.User.findOne({
      contact: data.contact || "",
    });
    if (!existingUser) {
      return await models.User.create({
        name: data.name || "",
        avatar: data.avatar || "",
        contact: data.contact || "",
        token,
      });
    }
    existingUser.set({ token });
    return existingUser.save();
  },
};
