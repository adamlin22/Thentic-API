import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Layout from "../../components/Layout";
import { AppContext } from "../../contexts/AppContext";
import { networks } from "../../config/constants";
import { createContract } from "../../services/thentic";
import CustomButton from "../../components/CustomButton";

function MintPage() {
  const { apiKey } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [chainName, setChainName] = useState();
  const [network, setNetwork] = useState();
  const [nftName, setNftName] = useState();
  const [nftSymbol, setNftSymbol] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState({
    network: false,
    name: false,
    symbol: false,
  });
  const [walletLink, setWalletLink] = useState();

  useEffect(() => {
    setNetwork(networks.find((_network) => _network.name === chainName));
  }, [chainName]);

  useEffect(() => {
    setCanSubmit(network && nftName && nftSymbol);

    setError({
      network: !(chainName === undefined || chainName),
      name: !(nftName === undefined || nftName),
      symbol: !(nftSymbol === undefined || nftSymbol),
    });
  }, [chainName, nftName, nftSymbol]);

  const clearFields = () => {
    setChainName(undefined);
    setNetwork(undefined);
    setNftName(undefined);
    setNftSymbol(undefined);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setNftName(e.target.value);
  };

  const handleSymbolChange = (e) => {
    e.preventDefault();
    setNftSymbol(e.target.value);
  };

  const handleCreateClick = async () => {
    if (!apiKey) {
      return toast.warn("You need Thentic API Key first!");
    }

    clearFields();

    setLoading(true);
    const transaction = await createContract({
      key: apiKey,
      chain_id: network.chainid,
      name: nftName,
      short_name: nftSymbol,
    });
    transaction && setWalletLink(transaction.transaction_url);
    setLoading(false);
  };

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

export default MintPage;
