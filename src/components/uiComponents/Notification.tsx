import React, { useRef } from "react";
import { useNexus } from "../../../nexus-state/src/nexus";

export default function Notification() {
  const notifRef = useRef(null as HTMLDivElement | null);
  const randomKey = Math.random().toString(36).slice(2, 6);

  const notifState = useNexus("notif");

  const localView = notifState?.view;
  const localClassName = notifState?.className;
  const localImg = notifState?.img;
  const localText = notifState?.text;

  return (
    <>
      {localView && (
        <div
          key={randomKey}
          ref={notifRef}
          className={`notifWrap${localClassName ? ` ${localClassName}` : ""}`}
        >
          {localImg && <img src={localImg} alt="" />}
          <div className="notifText">{localText}</div>
          <div className="closeIcn"></div>
        </div>
      )}
    </>
  );
}
