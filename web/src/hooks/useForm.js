import { useState, useContext } from "react";
import { FlashContext } from "../components/Flash/FlashProvider";
import { useApolloClient, useMutation } from "react-apollo-hooks";

export function useForm({ MUTATION, modelName, defaults, afterUpdate }) {
  const { add } = useContext(FlashContext);
  const client = useApolloClient();

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({ ...defaults });

  const create = useMutation(MUTATION, {
    variables: data,
    update: function(proxy, result) {
      setShowForm(false);
      setData({ ...defaults });
      client.resetStore();
    }
  });

  function handleCreate() {
    if (!data.body) {
      add({ message: "Body can't be be blank", level: "Error" });
      return;
    }
    create()
      .then(() => {
        add({ message: `${modelName} created`, level: "Success" });
      })
      .catch(e => {
        add({ message: e.message, level: "Error" });
      });
  }

  return { data, setData, showForm, setShowForm, handleCreate };
}
