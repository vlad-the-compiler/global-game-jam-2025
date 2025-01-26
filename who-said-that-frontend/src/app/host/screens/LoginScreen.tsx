import QRCode from "react-qr-code";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";

const LoginScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <GameLogo />
      </VContainer>
      <VContainer>
        <VContainer>
          <HeadingContainer>Scan to join</HeadingContainer>
          <div className="bg-white inline-block m-4 p-4 rounded-xl">
            <div className="inline-block rounded-lg overflow-clip m-0 p-0">
              <QRCode value={`http://${process.env.GAME_SERVER_ADDRESS}:${process.env.LISTEN_PORT}/client`} />
            </div>
          </div>
        </VContainer>
        <VContainer>
          <HeadingContainer size="medium">Current Players</HeadingContainer>
          <VContainer>...</VContainer>
        </VContainer>
      </VContainer>
    </HContainer>
  );
};

export default LoginScreen;
