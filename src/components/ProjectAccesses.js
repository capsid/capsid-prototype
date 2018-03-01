import React from "react";
import styled from "react-emotion";

import { Project as ProjectAccess } from "@capsid/components/access";
import {
  accessesUpdateCache,
  AccessesContainer,
  AccessRemoveContainer
} from "@capsid/components/containers";
import AccessAddForm from "@capsid/components/AccessAddForm";

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

const AccessesContent = styled("div")`
  margin-top: 20px;
`;

const ProjectAccesses = ({ projectId }) => (
  <div>
    <h4>Users:</h4>
    <ProjectAccess projectId={projectId} access="admin">
      <AccessAddForm projectId={projectId} />
    </ProjectAccess>
    <AccessesContainer first={1000} projectId={projectId}>
      {({ data: { items, loading } }) => (
        <AccessesContent>
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
        </AccessesContent>
      )}
    </AccessesContainer>
  </div>
);

export default ProjectAccesses;
