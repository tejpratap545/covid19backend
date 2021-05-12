import React, { useState } from "react";
import { Box, Button, Header } from "@admin-bro/design-system";
import { DropZone, Label, BasePropertyProps } from "@admin-bro/design-system";
import { useCurrentAdmin } from "admin-bro";

const Upload = (props) => {
  const { label, api } = props;
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  const onUpload = (files) => {
    var formdata = new FormData();
    formdata.append("resource", files[0]);
    formdata.append("volunteer", currentAdmin.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(`api/${api}/upload/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("data is successfully imported");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box>
      <Label>{label}</Label>
      <DropZone onChange={onUpload} />
    </Box>
  );
};

export default Upload;
