import React from "react";
import { compose, withState } from "recompose";

import { accessesUpdateCache, AccessAddContainer } from "./containers";

const formToJson = form =>
  Object.values(form.elements)
    .filter(x => x.type !== "submit")
    .reduce((obj, x) => ({ ...obj, [x.name]: x.value }), {});

const addUser = async ({
  event,
  mutate,
  projectId,
  setLoading,
  setValidation
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
      setValidation([]);
    })
    .catch(({ graphQLErrors, networkError }) => {
      setValidation(graphQLErrors.map(({ message }) => message));
      networkError && console.error(networkError);
    });
  setLoading(false);
};

const enhance = compose(
  withState("loading", "setLoading", false),
  withState("validation", "setValidation", [])
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
          <ul>{validation.map(x => <li key={x}>{x}</li>)}</ul>
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
