import React from "react";
import { connect } from "react-redux";

const Project = ({ profile, projectId, children, access }) => {
  const projectAccess = (
    profile.access.find(x => x.projectId === projectId) || {}
  ).access;
  return profile.superUser || (projectAccess || []).includes(access) ? (
    children
  ) : (
    <div />
  );
};

export default connect(state => ({
  profile: state.user.profile
}))(Project);
