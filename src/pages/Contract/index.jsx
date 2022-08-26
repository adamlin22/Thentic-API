import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Layout from "../../components/Layout";
import { networks } from "../../config/constants";
import CustomButton from "../../components/CustomButton";

function ContractPage() {
  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Create New NFT contract
      </Typography>

      <Autocomplete
        onChange={(event, newValue) => {
          setChainName(newValue);
        }}
        options={networks.map((_network) => _network.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Network"
            error={error.network}
            required
          />
        )}
        sx={{ my: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
        required
        onChange={handleNameChange}
        error={error.name}
        sx={{ mb: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Short Name"
        variant="outlined"
        fullWidth
        required
        onChange={handleSymbolChange}
        error={error.symbol}
        sx={{ mb: 2 }}
      />

      <LoadingButton
        variant="contained"
        size="large"
        fullWidth
        onClick={handleCreateClick}
        disabled={!canSubmit}
        loading={loading}
        sx={{ mb: 2 }}
      >
        Create your NFT contract
      </LoadingButton>

      <CustomButton
        href={walletLink}
        target="_blank"
        color="success"
        disabled={!walletLink}
      >
        Connect to Metamask
      </CustomButton>
    </Layout>
  );
}

export default ContractPage;
