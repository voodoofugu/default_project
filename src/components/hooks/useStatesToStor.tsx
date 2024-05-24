import React from "react";
import { selectors, useDispatch } from "../stateManage/GlobalStateStor";

export default function useStatesToStor(type: string, payload: object) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: type,
      payload: payload,
    });
  }, [type, payload]);
}
