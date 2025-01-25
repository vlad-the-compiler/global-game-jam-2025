import Header from "@/app/client/header";
import BottomButtons from "@/app/client/bottomButtons";
import MessagingSection from "@/app/client/messagingSection";
import PlayerCreation from "@/app/client/playerCreation/playerCreation";
import NamePicker from "@/app/client/playerCreation/namePicker";
import ColorPicker from "@/app/client/playerCreation/colorPicker";
import FacePicker from "@/app/client/playerCreation/facePicker";
import AccessoryPicker from "@/app/client/playerCreation/accessoryPicker";
import WaitingCreationEnd from "@/app/client/playerCreation/waitingCreationEnd";

const PlayerCreationPages = {
  NamePicker,
  ColorPicker,
  FacePicker,
  AccessoryPicker,
  WaitingCreationEnd,
};

export { Header, BottomButtons, MessagingSection, PlayerCreation, PlayerCreationPages };
