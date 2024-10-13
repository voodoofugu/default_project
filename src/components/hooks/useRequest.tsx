import React from "react";
import { useGetNexus, useSetNexus } from "../stateManager/store";

interface RequestState {
  data?: any;
  requestLoaded?: boolean;
}

export default function useRequest(requestName: string, url: string) {
  const requestData = useGetNexus<RequestState>(requestName);

  const storageRequestName = JSON.parse(sessionStorage.getItem(`📌`)); // !!!

  const setNexus = useSetNexus();

  React.useEffect(() => {
    let isMounted = true;

    if (storageRequestName[requestName].url === url) {
      setNexus({
        type: "REQUEST_DATA",
        payload: {
          requestName: requestName,
          data: storageRequestName[requestName].data,
          requestLoaded: storageRequestName[requestName].requestLoaded,
        },
      });
      return;
    }

    (async () => {
      try {
        const response = await fetch(url);

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        if (isMounted) {
          setNexus({
            type: "REQUEST_DATA",
            payload: {
              requestName: requestName,
              data: json,
              requestLoaded: true,
            },
          });
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setNexus({
            type: "REQUEST_DATA",
            payload: {
              requestName: requestName,
              data: "🚫",
              requestLoaded: false,
            },
          });
        }
      }
    })();

    return () => {
      isMounted = false;
      setNexus({
        type: "REQUEST_DATA",
        payload: {
          requestName: requestName,
          data: undefined,
          requestLoaded: false,
        },
      });
    };
  }, [requestName, url]);

  return {
    requestLoaded: requestData ? requestData.requestLoaded : false,
    data: requestData && requestData.data,
  };
}
