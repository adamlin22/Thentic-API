import { useContext, useState } from "react";
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Layout from "../../components/Layout";
import CustomButton from "../../components/CustomButton";
import { AppContext } from "../../contexts/AppContext";

function HomePage() {
  const { apiKey, requestApiKey } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleCreateClick = async () => {
    setLoading(true);
    await requestApiKey();
    setLoading(false);
  };

  const handleShowToggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Request Your Thentic API Key
      </Typography>

      {apiKey ? (
        <>
          <TextField
            label="THENTIC API KEY"
            defaultValue={apiKey}
            type={show ? "text" : "password"}
            disabled
            fullWidth
            sx={{ my: 2 }}
          />
          <CustomButton color="success" onClick={handleShowToggle}>
            {show ? "Hide Your API Key" : "Show Your API Key"}
          </CustomButton>
        </>
      ) : (
        <LoadingButton
          variant="contained"
          size="large"
          fullwidth
          onClick={handleCreateClick}
          disabled={apiKey}
          loading={loading}
        >
          Request
        </LoadingButton>
      )}
    </Layout>
  );
}

export default HomePage;
