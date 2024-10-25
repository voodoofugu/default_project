import React from "react";
// import useRequest from "../hooks/useRequest";

interface RequestProps {
  requestName: string;
  url: string;
  loadingElement?: React.ReactNode;
  children: (data: any) => React.ReactNode;
}

const Request: React.FC<RequestProps> = ({
  // requestName,
  url,
  // loadingElement,
  children,
}) => {
  const wer = url;
  // const { requestLoaded, data } = useRequest(requestName, url);
  // if (!requestLoaded && !data) {
  //   return <>{loadingElement || <div>Loading...</div>}</>;
  // }
  // if (data === "🚫") {
  //   return <div>🚫 Error loading data</div>;
  // }
  if (wer) {
    return <>{children(wer)}</>;
  }
};

export default Request;
