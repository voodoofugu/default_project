import React, { useEffect, useState } from "react";
import { useStoreContext } from "../stateManage/Provider";

interface RequestState {
  data?: any;
  requestLoaded?: boolean;
}

export default function useRequest(requestName: string, url: string) {
  const [requestData, setRequestData] =
    useStoreContext<RequestState>(requestName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
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
              requestName,
              data: json,
              requestLoaded: true,
            },
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setRequestData({
            type: "REQUEST_DATA",
            payload: {
              requestName,
              data: "🚫",
              requestLoaded: false,
            },
          });
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      setRequestData({
        type: "REQUEST_DATA",
        payload: {
          requestName,
          data: undefined,
          requestLoaded: false,
        },
      });
    };
  }, [requestName, url, setRequestData]);

  return {
    data: requestData ? requestData.data : undefined,
    requestLoaded: requestData ? requestData.requestLoaded : false,
    loading,
  };
}
