import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";

const TitleScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <GameLogo />
        <HeadingContainer>The broken telecom company game</HeadingContainer>
      </VContainer>
    </HContainer>
  );
};

export default TitleScreen;
