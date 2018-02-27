import React from "react";

import { AccessesContainer } from "./containers";
import AccessAddForm from "./AccessAddForm";

const ProjectAccesses = ({ projectId }) => (
  <div>
    <h4>Users:</h4>
    <AccessAddForm projectId={projectId} />
    <AccessesContainer first={1000} filter={{ projectId }}>
      {({ data: { items, loading } }) => (
        <div style={{ marginTop: 20 }}>
          {loading && `...`}
          {!loading &&
            items.map(({ userEmail, access }) => (
              <div key={userEmail}>
                <span>
                  {userEmail} - {access.join(", ")}
                </span>
              </div>
            ))}
        </div>
      )}
    </AccessesContainer>
  </div>
);

export default ProjectAccesses;
