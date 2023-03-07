import User from "../models/User.js";
import Community from "../models/Community.js";

export const searchUsersOrCommunities = async (req, res) => {
  const { search } = req.params;
  if (!search || search === "null") return res.status(200).json([]);
  if (typeof search !== "string")
    return res.status(400).json({ message: "Wrong input" });
  try {
    const usersNameAsync = await User.find();
    const usersLastNameAsync = await User.find();
    const communitiesAsync = await Community.find();
    const usersName = usersNameAsync.filter((item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase())
    );
    const usersLastName = usersLastNameAsync.filter((item) =>
      item.lastName.toLowerCase().includes(search.toLowerCase())
    );
    const communities = communitiesAsync.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    const users = usersName.concat(usersLastName);

    const usersMap = new Map();
    users.forEach((item) => {
      const prevValue = usersMap.get(item._id);
      if (!prevValue) {
        usersMap.set(item._id, item);
      }
    });
    const newUsersArray = [...usersMap.values()];
    let finalArray = [];
    newUsersArray.forEach((item) => {
      finalArray.push({
        group: "Users",
        name: `${item._doc.firstName} ${item._doc.lastName}`,
        id: item._doc._id,
      });
    });
    communities.forEach((item) => {
      finalArray.push({
        group: "Community",
        id: item._doc._id,
        name: item._doc.name,
      });
    });

    res.status(200).json(finalArray);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
