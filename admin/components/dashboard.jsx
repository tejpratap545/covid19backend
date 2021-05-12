import { ApiClient } from "admin-bro";
import { Box, Button, Header } from "@admin-bro/design-system";
import { useState, useEffect } from "react";
import Upload from "./upload";
const api = new ApiClient();

const Dashboard = () => {
  const [helpdesks, setHelpDesks] = useState({});
  // const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    function loadData() {
      // setIsLoaded(false);

      fetch(`api/helpdesk?API-KEY=FYMmbMXfaB_eFw`)
        .then((res) => res.json())
        .then((result) => {
          // setIsLoaded(true);
          setHelpDesks(result);
        });
    }

    loadData();
  }, []);

  return (
    <Box variant="grey">
      <Header.H1 style={{ textAlign: "center" }}>Join Helpdesks</Header.H1>
      <Box variant="white">
        <div className="helpdesk-container" style={{ padding: "10px 0" }}>
          {helpdesks.cities &&
            helpdesks.cities.map((item) => (
              <div key={item._id}>
                <Box variant="card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h2 style={{ fontSize: "18px" }}>{item.name}</h2>
                    <Button>Join</Button>
                  </div>
                </Box>
              </div>
            ))}
        </div>

        <div style={{ margin: "20px 0" }}>
          <Button>Create Helpdesk</Button>
        </div>

        <Box>
          <Upload label="Upload resource data" api="resource"></Upload>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
