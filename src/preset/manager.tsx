import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID } from "../constants";
import { Tool } from "../components/Tool";

addons.register(ADDON_ID, (api) => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Theme toggle",
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <Tool api={api} />,
  });
});
