import React from "react";
import useStoreContext from "../stateManager/store";

interface RequestState {
  data?: any;
  requestLoaded?: boolean;
}

export default function useRequest(requestName: string, url: string) {
  const [requestData, setRequestData] =
    useStoreContext<RequestState>(requestName);

  const storageRequestName = JSON.parse(sessionStorage.getItem(`📌`)); // !!!

  React.useEffect(() => {
    let isMounted = true;

    if (storageRequestName[requestName].url === url) {
      setRequestData({
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
          setRequestData({
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
          setRequestData({
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
      setRequestData({
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
