import React from "react";
import { compose, withState } from "recompose";
import { Button, FormGroup, Intent } from "@blueprintjs/core";

import {
  accessesUpdateCache,
  AccessAddContainer
} from "@capsid/components/containers";

const formToJson = form =>
  Object.values(form.elements)
    .filter(x => x.type !== "submit")
    .reduce((obj, x) => ({ ...obj, [x.name]: x.value }), {});

const addUser = async ({
  event,
  mutate,
  projectId,
  setLoading,
  setValidation,
  onAdd
}) => {
  event.preventDefault();
  setLoading(true);
  const form = event.target;
  const { userEmail, access } = formToJson(form);
  await mutate({
    variables: { projectId, userEmail, access },
    update: (proxy, { data: { item } }) => {
      accessesUpdateCache({
        projectId,
        proxy,
        nextData: ({ data }) => ({ ...data, items: [...data.items, item] })
      });
    }
  })
    .then(() => {
      form.reset();
      setValidation({});
      onAdd && onAdd();
    })
    .catch(({ graphQLErrors, networkError }) => {
      setValidation(
        graphQLErrors.reduce((obj, { message }) => {
          const [key, value] = message.split(":");
          return {
            ...obj,
            [key]: obj[key] ? [...obj[key], value] : [value]
          };
        }, {})
      );
      networkError && console.error(networkError);
    });
  setLoading(false);
};

const enhance = compose(
  withState("loading", "setLoading", false),
  withState("validation", "setValidation", {})
);

const AccessAddForm = ({
  projectId,
  loading,
  setLoading,
  validation,
  setValidation,
  onAdd
}) => (
  <AccessAddContainer>
    {({ mutate }) => (
      <form
        onSubmit={event =>
          addUser({
            event,
            mutate,
            projectId,
            setLoading,
            setValidation,
            onAdd
          })
        }
      >
        <h6>Add a User</h6>
        <FormGroup
          label="Role"
          {...validation.access && {
            intent: Intent.DANGER,
            helperText: validation.access
          }}
          labelFor="access"
          required={true}
        >
          <div className="pt-select">
            <select id="access" name="access">
              <option />
              <option value="admin">Admin</option>
              <option value="write">Write</option>
              <option value="read">Read</option>
            </select>
          </div>
        </FormGroup>
        <FormGroup
          label="Email"
          labelFor="userEmail"
          {...validation.userEmail && {
            intent: Intent.DANGER,
            helperText: validation.userEmail
          }}
          required={true}
        >
          <input
            className={`pt-input ${
              validation.userEmail ? "pt-intent-danger" : ""
            }`}
            name="userEmail"
            type="text"
            placeholder="Email"
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          Add User
        </Button>
      </form>
    )}
  </AccessAddContainer>
);

export default enhance(AccessAddForm);
