import BouncyContainer from "../components/BouncyContainer";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";

const RoundScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <BouncyContainer>
          <GameLogo />
        </BouncyContainer>
        <HeadingContainer size="medium">Please wait while the players are screaming at each other</HeadingContainer>
      </VContainer>
    </HContainer>
  );
};

export default RoundScreen;
