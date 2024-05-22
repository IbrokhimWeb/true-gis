"use client";

import Eight from "@/components/steps/eight";
import Five from "@/components/steps/five";
import Four from "@/components/steps/four";
import One from "@/components/steps/one";
import Seven from "@/components/steps/seven";
import Six from "@/components/steps/six";
import Three from "@/components/steps/three";
import Two from "@/components/steps/two";
import Steper from "@/components/ui/steper";
import { State } from "@/store";
import { useSelector } from "react-redux";

const steps = {
  1: <One />,
  2: <Two />,
  3: <Three />,
  4: <Four />,
  5: <Five />,
  6: <Six />,
  7: <Seven />,
  8: <Eight />,
};

function Home() {
  const { active_step } = useSelector(({ steper }: State) => steper);

  return (
    <div className="w-full">
      <Steper />
      {/* @ts-ignore */}
      {steps[active_step]}
    </div>
  );
}
export default Home;
