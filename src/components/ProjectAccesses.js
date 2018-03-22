import React from "react";
import { compose, withState } from "recompose";
import { Box } from "grid-styled";
import { Button, Icon } from "@blueprintjs/core";

import MinimalButton from "@capsid/components/Button";
import { Project as ProjectAccess } from "@capsid/components/access";
import {
  accessesUpdateCache,
  AccessesContainer,
  AccessRemoveContainer
} from "@capsid/components/containers";
import AccessAddForm from "@capsid/components/AccessAddForm";
import Modal from "@capsid/components/Modal";

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

const AccessAddOverlay = compose(withState("isOpen", "setIsOpen", false))(
  ({ isOpen, setIsOpen, projectId }) => (
    <Box>
      <Button iconName="add" onClick={() => setIsOpen(true)}>
        Add User
      </Button>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <AccessAddForm projectId={projectId} onAdd={() => setIsOpen(false)} />
      </Modal>
    </Box>
  )
);

const ProjectAccesses = ({ projectId }) => (
  <div>
    <ProjectAccess projectId={projectId} access="admin">
      <AccessAddOverlay projectId={projectId} />
    </ProjectAccess>
    <AccessesContainer first={1000} projectId={projectId}>
      {({ data: { items, loading } }) => (
        <Box mt={4}>
          {loading && `...`}
          {!loading &&
            (!items.length ? (
              <div>This project has no users yet</div>
            ) : (
              <table
                className="pt-table pt-bordered pt-striped pt-condensed"
                width="100%"
              >
                <thead>
                  <tr>
                    <ProjectAccess projectId={projectId} access="admin">
                      <th />
                    </ProjectAccess>
                    <th>Email</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(({ userEmail, access }) => (
                    <tr>
                      <ProjectAccess projectId={projectId} access="admin">
                        <td>
                          <AccessRemoveContainer>
                            {({ mutate }) => (
                              <MinimalButton
                                className="pt-minimal"
                                iconName="delete"
                                onClick={() =>
                                  removeUserAccess({
                                    projectId,
                                    userEmail,
                                    mutate
                                  })
                                }
                              />
                            )}
                          </AccessRemoveContainer>
                        </td>
                      </ProjectAccess>
                      <td>{userEmail}</td>
                      {["read", "write", "admin"].map(x => (
                        <td key={x}>
                          <Icon
                            iconName={
                              access.find(y => y === x) ? "star" : "disable"
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
        </Box>
      )}
    </AccessesContainer>
  </div>
);

export default ProjectAccesses;
