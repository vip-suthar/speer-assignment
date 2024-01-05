export const activityContainerStyle = (props) => ({
  boxSizing: "border-box",
  width: "100%",
  padding: props.screens.xs ? "10px 10px" : "10px 70px",
});

export const activityListContainerStyle = (props) => ({
  width: "100%",
  padding: "0 10px",
  scrollbarGutter: "stable",
  overflow: "auto",
});
