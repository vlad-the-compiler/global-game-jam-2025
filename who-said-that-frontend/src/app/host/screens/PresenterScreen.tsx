import QRCode from "react-qr-code";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";
import CharacterModel from "@/app/characterModel";
import BouncyContainer from "../components/BouncyContainer";
import styles from "../components/style/animation.module.css";

const cannedConvo = [
  "Redacted for family friendly content 💖💗💞✨💝",
  "Hi mom, im on TV!",
  "The developers asked me to say this",
  "Are you having fun yet???",
  "I sometimes dowse myself in yoghurt, go in tall grass and pretend im a salad"
];

const PresenterScreen = () => {
  return (
    <HContainer>
      <VContainer>
        <GameLogo />
      </VContainer>
      <div className="flex pr-8 w-full h-full flex-1 flex-col justify-start overflow-hidden">
        <HContainer className="py-4 flex-grow-0">
          <HeadingContainer size="medium">Costica Brehar's thread</HeadingContainer>
        </HContainer>
        <VContainer justify="end" className="overflow-hidden">
          {cannedConvo.map((k, n) => (
            <HContainer key={n} className={`flex-grow-0 p-4 mb-8 bg-white border-4 border-black rounded-lg ${styles.expandableContent}`}>
              <VContainer className="flex-grow-0">
                <CharacterModel color={n} face={n + 1} accessory={n + 2} size="lg" name="" />
              </VContainer>
              <div className="flex-1 pl-4">{k}</div>
            </HContainer>
          ))}
        </VContainer>
      </div>
    </HContainer>
  );
};

export default PresenterScreen;
