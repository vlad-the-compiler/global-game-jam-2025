import BouncyContainer from "../components/BouncyContainer";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";

const EndGameScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <BouncyContainer>
          <GameLogo />
        </BouncyContainer>
        <HeadingContainer>Game Over, hope you enjoyed! #GGJ25</HeadingContainer>
      </VContainer>
    </HContainer>
  );
};

export default EndGameScreen;
