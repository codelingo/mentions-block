import React from "react";
import { render } from "@testing-library/react";
import MentionsPopover from "./MentionsPopover";

describe("MentionsPopover", () => {
  test("renders the MentionsPopover component", () => {
    render(
      <MentionsPopover
        team={undefined}
        isOpen={false}
        handleClose={() => {}}
        handleSetText={() => {}}
      >
        <></>
      </MentionsPopover>
    );
  });
});
