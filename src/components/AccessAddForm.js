import React from "react";
import { compose, withState } from "recompose";
import _ from "lodash";

import { AccessesQuery, AccessAddContainer } from "./containers";

const formToJson = form =>
  Object.values(form.elements)
    .filter(x => x.type !== "submit")
    .reduce((obj, x) => ({ ...obj, [x.name]: x.value }), {});

const validateUser = ({ userEmail, access }) => {
  let validation = {};
  if (!access) validation.role = "Select a role";
  if (!userEmail) validation.email = "Enter an email";
  return validation;
};

const addUser = async ({
  event,
  mutate,
  projectId,
  setLoading,
  setValidation
}) => {
  event.preventDefault();
  const form = event.target;
  const { userEmail, access } = formToJson(form);
  const validation = validateUser({ userEmail, access });
  setValidation(validation);
  if (_.isEmpty(validation)) {
    form.reset();
    setLoading(true);
    await mutate({
      variables: { projectId, userEmail, access },
      update: (proxy, { data: { item } }) => {
        const cacheArgs = {
          query: AccessesQuery,
          variables: { filter: { projectId } }
        };
        const data = proxy.readQuery(cacheArgs);
        data.items.push(item);
        proxy.writeQuery({ ...cacheArgs, data });
      }
    }).catch(err => console.error(err));
    setLoading(false);
  }
};

const enhance = compose(
  withState("loading", "setLoading", false),
  withState("validation", "setValidation", {})
);

const AccessAddForm = enhance(
  ({ projectId, loading, setLoading, validation, setValidation }) => (
    <AccessAddContainer>
      {({ mutate }) => (
        <form
          onSubmit={event =>
            addUser({ event, mutate, projectId, setLoading, setValidation })
          }
        >
          <ul>{Object.values(validation).map(x => <li key={x}>{x}</li>)}</ul>
          <div>
            <label>Role: </label>
            <select name="access">
              <option />
              <option value="admin">Admin</option>
              <option value="write">Write</option>
              <option value="read">Read</option>
            </select>
          </div>
          <div>
            <label>Email: </label>
            <input name="userEmail" type="text" placeholder="Email" />
          </div>
          <input type="submit" value="Add User" disabled={loading} />
        </form>
      )}
    </AccessAddContainer>
  )
);

export default AccessAddForm;
