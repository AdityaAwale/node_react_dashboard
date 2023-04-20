import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { Box, Container } from "@mui/material";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";
import { yariga } from "assets";

// Todo: Update your Google Client ID here
// const GOOGLE_CLIENT_ID =
//   "1041339102270-jlljcjl19jo1hkgf695em3ibr7q2m734.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#abaeea",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
        bgcolor="#fcfcfc"
        p={6}
        borderRadius={2}
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
          text="Properties"
          icon={yariga}
        />

        {/* <div>
          <img src={yariga} alt="Properties logo" />
        </div> */}

        <GoogleButton />

        {/* <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <img style={{ padding: "0 5px" }} alt="Google" src={yariga} />
          Google
        </Typography> */}
      </Box>
    </Container>
  );
};
