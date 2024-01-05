import axios from "axios";

const baseUrl = "https://cerulean-marlin-wig.cyclic.app";

export const fetchActivitiesAPI = async () => {
  const { data } = await axios.get(baseUrl + "/activities");
  return data;
};

export const setActivityArchivedAPI = async ({ id, archived }) => {
  const { data } = await axios.patch(baseUrl + "/activities/" + id, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: { is_archived: !!archived },
  });
  return data;
};

export const setAllArchivedAPI = async (list) => {
  return await Promise.all(
    list.map((item) =>
      (async () => {
        const { data } = await axios.patch(baseUrl + "/activities/" + item.id, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: JSON.stringify({ is_archived: true }),
        });
        return data;
      })()
    )
  );
};

export const setAllUnarchivedAPI = async () => {
  const { data } = await axios.patch(baseUrl + "/reset");
  return data;
};
