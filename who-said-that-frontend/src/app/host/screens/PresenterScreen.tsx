import QRCode from "react-qr-code";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";
import CharacterModel from "@/app/characterModel";
import BouncyContainer from "../components/BouncyContainer";
import styles from "../components/style/animation.module.css";

const PresenterScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <GameLogo />
      </VContainer>
      <div className="flex pr-8 w-full h-full flex-1 flex-col justify-start overflow-hidden">
        <HContainer className="py-4 flex-grow-0">
          <HeadingContainer size="medium">Pulica's thread</HeadingContainer>
        </HContainer>
        <VContainer justify="end" className="overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <HContainer key={n} className={`flex-grow-0 p-4 mb-8 bg-white border-4 border-black rounded-lg ${styles.expandableContent}`}>
              <VContainer className="flex-grow-0">
                <CharacterModel color={n} face={0} accessory={0} size="lg" name="Franaru" />
              </VContainer>
              <div className="flex-1 pl-4">
                I heard your mom likes fucking, what a whore I bet your dad is actually a peste pe romaneste ha ha ha votati selly
              </div>
            </HContainer>
          ))}
        </VContainer>
      </div>
    </HContainer>
  );
};

export default PresenterScreen;
