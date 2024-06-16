import ClockModal from "@/components/clockmodal";
import React, { useEffect, useState } from "react";
import AlarmScreen from "./dd";

const Clock = () => {
  return (
    <>
      <AlarmScreen />
      <ClockModal
        onConfirm={() => {console.log("done")}}
        onClose={() => console.log("closed")}
        visible={true}
      />
    </>
  );
};

export default Clock;
