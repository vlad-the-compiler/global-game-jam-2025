import QRCode from "react-qr-code";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";
import CharacterModel from "@/app/characterModel";
import BouncyContainer from "../components/BouncyContainer";
import { useGameContext } from "@/app/GameContext";

const WaitingRoom = () => {
  const game = useGameContext();

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
              <QRCode size={200} value={`http://${process.env.GAME_SERVER_ADDRESS}:${process.env.LISTEN_PORT}/client`} />
            </div>
          </div>
        </VContainer>
        <VContainer>
          <HeadingContainer size="medium">Current Players</HeadingContainer>
          <VContainer className="grid grid-cols-4 gap-0">
            {game.players.map((player) => (
              <BouncyContainer key={player.token}>
                <CharacterModel color={player.color} face={player.face} accessory={player.accessory} name={player.name} size="xl" />
              </BouncyContainer>
            ))}
          </VContainer>
        </VContainer>
      </VContainer>
    </HContainer>
  );
};

export default WaitingRoom;
