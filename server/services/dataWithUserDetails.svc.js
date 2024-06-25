const responseSvc = require("./response.svc");

const formattedItemsSvc = {
  includePostedBy: async (res, items, Model) => {
    try {
      const resultItems = [];
      for (const item of items) {
        const user = await Model.findById(item.userId);
        const formattedItem = {
          content: item,
          postedBy: {
            userImg: user?.profileImg || "",
            userName: user?.firstName || "Unknown User",
          },
        };
        resultItems.push(formattedItem);
      }
      return resultItems;
    } catch (error) {
      responseSvc.serverError(res.error);
      return []; // Return an empty array or handle errors in a different way based on your requirements
    }
  },
};

module.exports = formattedItemsSvc;
