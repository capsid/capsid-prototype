import React from "react";

import { Project as ProjectAccess } from "./access";
import {
  accessesUpdateCache,
  AccessesContainer,
  AccessRemoveContainer
} from "./containers";
import AccessAddForm from "./AccessAddForm";

const removeUserAccess = async ({ userEmail, projectId, mutate }) => {
  await mutate({
    variables: { projectId, userEmail },
    update: (proxy, { data: { item: { record: { userId } } } }) => {
      accessesUpdateCache({
        projectId,
        proxy,
        nextData: ({ data }) => ({
          ...data,
          items: data.items.filter(x => x.userId !== userId)
        })
      });
    }
  }).catch(err => console.error(err));
};

const ProjectAccesses = ({ projectId }) => (
  <div>
    <h4>Users:</h4>
    <ProjectAccess projectId={projectId} access="admin">
      <AccessAddForm projectId={projectId} />
    </ProjectAccess>
    <AccessesContainer first={1000} projectId={projectId}>
      {({ data: { items, loading } }) => (
        <div style={{ marginTop: 20 }}>
          {loading && `...`}
          {!loading && (
            <AccessRemoveContainer>
              {({ mutate }) => (
                <div>
                  {items.map(({ userEmail, access }) => (
                    <div
                      key={userEmail}
                      onClick={() =>
                        removeUserAccess({ projectId, userEmail, mutate })
                      }
                    >
                      <span>
                        {userEmail} - {access.join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </AccessRemoveContainer>
          )}
        </div>
      )}
    </AccessesContainer>
  </div>
);

export default ProjectAccesses;
