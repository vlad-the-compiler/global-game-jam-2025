import BouncyContainer from "../components/BouncyContainer";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";

const TitleScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <BouncyContainer>
          <GameLogo />
        </BouncyContainer>
        <HeadingContainer>The broken telecom company game</HeadingContainer>
      </VContainer>
    </HContainer>
  );
};

export default TitleScreen;
