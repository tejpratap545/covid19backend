import { useCurrentAdmin } from "admin-bro";

import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Header,
  Drawer,
  Label,
  Icon,
} from "@admin-bro/design-system";

const Helpdesk = (props) => {
  const [userName, setName] = useState("");
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  function creatHelpdesk() {
    const helpDeskdata = {
      name: userName,
    };

    fetch(`/api/helpdesk?API-KEY=FYMmbMXfaB_eFw`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helpDeskdata),
    }).then(() => {    
      currentAdmin.role = "admin"

      fetch(`/api/volunteer/${currentAdmin._id}?API-KEY=FYMmbMXfaB_eFw&role=admin`)
      setCurrentAdmin(currentAdmin);

      props.UpdateEvent();
      props.CloseDrawer();
    });
  }

  return (
    <Drawer {...props}>
      <Box variant="white">
        <Header.H2>
          <Button
            size="icon"
            rounded="true"
            margin="0 20px 0 0"
            onClick={() => props.CloseDrawer()}
          >
            <Icon icon="ChevronRight"></Icon>
          </Button>
          Create Helpdesk
        </Header.H2>

        <Box mb="xl" width={1}>
          <Label>Enter name</Label>
          <Input
            value={userName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Help Monkey"
            variant="xl"
            width={1}
          />
        </Box>

        <Box mb="xl" width={1}>
          <Button variant="primary" onClick={() => creatHelpdesk()}>
            Create helpdesk
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Helpdesk;
