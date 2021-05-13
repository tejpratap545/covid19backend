import { useCurrentAdmin } from "admin-bro";

import { Box, Button, Header } from "@admin-bro/design-system";

import { useState, useEffect } from "react";
import Upload from "./upload";
import Helpdesk from "./helpdesk";

const Dashboard = () => {
  const [helpdesks, setHelpDesks] = useState({});
  const [status, setStatus] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [joined, setJoined] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  function loadData() {
    fetch(`/api/helpdesk?API-KEY=FYMmbMXfaB_eFw`)
      .then((res) => res.json())
      .then((result) => {
        setHelpDesks(result);
      });

    fetch(`/api/status/${currentAdmin.status}?API-KEY=FYMmbMXfaB_eFw`)
      .then((res) => res.json())
      .then((result) => {
        setStatus(result);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box variant="grey">
      <Header.H1 style={{ textAlign: "center" }}>Dashboard</Header.H1>
      <Box variant="white">
        {!joined && status && status.status.name == "PENDING" ? (
          <div className="helpdesk-container" style={{ padding: "10px 0" }}>
            { helpdesks.cities &&
              helpdesks.cities.map((item) => (
                <div key={item._id} style={{ margin: "10px 0" }}>
                  <Box variant="card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h2 style={{ fontSize: "18px" }}>{item.name}</h2>
                      <Button onClick={() => {
                          fetch(`/api/helpdesk/${item._id}-${currentAdmin._id}?API-KEY=FYMmbMXfaB_eFw`)
                           .then((res) => res.json())
                           .then((result) => {
                             setJoined(true);
                           });
                      }}>Join</Button>
                    </div>
                  </Box>
                </div>
              ))}

            <div
              style={{
                margin: "20px 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => setDrawer(!drawer)}>
                Create Helpdesk
              </Button>
            </div>
          </div>
        ) : (
          <Header.H3>You have successfully joined a helpdesk now you can receive phone calls from patients</Header.H3>
        )}

        {currentAdmin.role !== "volunteer" ? (
          <Box>
            <Upload label="Upload resource data" api="resource"></Upload>
            <a href="/public/covidaid.csv" download>
              Download excel formats
            </a>
          </Box>
        ) : (
          ``
        )}

        <Helpdesk
          isHidden={!drawer}
          CloseDrawer={() => setDrawer(!drawer)}
          UpdateEvent={() => loadData()}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
