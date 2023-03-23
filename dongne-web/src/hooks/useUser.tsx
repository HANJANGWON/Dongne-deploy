import {
  ApolloClient,
  useApolloClient,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import ME_QUERY from "../documents/queries/me.query";

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const client: ApolloClient<object> = useApolloClient();
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(client);
    }
  }, [data, client]);
  return { data };
};

export default useUser;
