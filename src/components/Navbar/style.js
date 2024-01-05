export const navbarContainerStyle = (props) => ({
  position: "relative",
  boxSizing: "border-box",
  width: props.screens.xs ? "100%" : props.expanded ? "220px" : "60px",
  padding: "10px",
  borderRight: props.screens.sm && "1px solid #d9d9d9",
  backgroundColor: "#ffffff",
  transition: "width 0.3s ease",
});

export const logoContainerStyle = (props) => ({
  width: "40px",
  height: "40px",
  textAlign: "center",
});

export const logoTitleStyle = (props) => ({
  color: "#3bb4e7",
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  transition: "all 0.3s ease",
});

export const navbarExpandButtonStyle = (props) => ({
  position: "absolute",
  top: "55px",
  right: 0,
  transform: "translate(50%, 0)",
});

export const navButtonsContainerStyle = (props) => ({
  marginTop: "15px",
});

export const navButtonStyle = (props) => ({
  border: 0,
  boxShadow: "none",
  transition: "all 0.3s ease",
  color: props.active && "#3bb4e7",
  backgroundColor: props.active && "#0b83bf16",
});

export const navActivityButtonIconStyle = (props) => ({
  fontSize: "25px",
  transform: "translate(0, 3px)",
});

export const navArchiveButtonIconStyle = (props) => ({
  fontSize: "25px",
  transform: "translate(0, 3px)",
});
