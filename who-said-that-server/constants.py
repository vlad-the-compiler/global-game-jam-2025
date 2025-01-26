from enum import Enum


class OpCodes(Enum):
    MARCO = "marco"
    POLO = "polo"
    ERROR = "error"

    REGISTER_HOST = "register-host"
    HOST_REGISTRATION_RESPONSE = "host-registration-response"
    REGISTER_PLAYER = "register-player"
    PLAYER_REGISTRATION_RESPONSE = "player-registration-response"

    REGISTER_PLAYER_DETAILS = "register-player-details"
    QUERY_PLAYER_POOL = "query-player-pool"
    PLAYER_POOL = "player-pool"

    BROADCAST_PROMPTS = "broadcast-prompts"
    PROMPT_RECEIVED = "prompt-received"

    SUBMIT_RESPONSE = "submit-response"
    GET_CHATS = "get-chats"
    CHATS_RECEIVED = "chats-received"

    ADVANCE_GAME = "advance-game"
    GAME_END = "game-end"


PROMPTS = [
    "I just bought a pet iguana and it’s already running for mayor.",
    "Have you ever tried to teach a fish how to fetch?",
    "The squirrels in my backyard are starting a protest. Should I be concerned?",
    "I swear my toaster is plotting against me.",
    "What do you think happens when a cactus gets lonely?",
    "I have a secret recipe for the world’s worst pancake.",
    "Last night, my shadow tried to escape my body.",
    "I accidentally adopted a raccoon, now we’re roommates.",
    "Do you think penguins ever get embarrassed?",
    "I have a theory that pizza is secretly the universe’s favorite food.",
    "If you could be any fruit, which one would you be?",
    "I lost a game of chess to a hamster, should I be worried?",
    "Do you think clouds ever get tired of floating around?",
    "The moon whispered my name last night. Should I be worried?",
    "I’m convinced my refrigerator is alive and has a secret life.",
    "If I could speak fluent llama, would that make me a millionaire?",
    "I tried to teach my cat how to speak, now it’s refusing to leave.",
    "I think my socks are plotting to disappear on me.",
    "Have you ever been to a party hosted by a rubber chicken?",
    "I just found out that my neighbor is secretly a time traveler.",
    "My plant just made eye contact with me and I swear it winked.",
    "The last time I saw a unicorn, it was stealing my lunch.",
    "I swear my car is trying to take me somewhere I’ve never been.",
    "Have you ever been trapped in a conversation with a parrot?",
    "The last time I saw a bear, it was using a smartphone.",
    "Do you think ghosts ever get annoyed by bad Wi-Fi?",
    "I swear my coffee mug judges me every morning.",
    "If you were a secret agent, would your code name be something cool or ridiculous?",
    "I just made a new friend, and it’s a potato.",
    "The toaster oven in my kitchen has started giving life advice.",
    "I accidentally invented a new dance move that no one should ever see.",
    "I once tried to ride a llama, but it had other plans.",
    "Have you ever considered what a rubber duck’s true purpose is?",
    "I found a treasure map on a cereal box. Should I follow it?",
    "Do you think ants ever have existential crises?",
    "My umbrella tried to escape with my lunch today.",
    "I think my alarm clock is conspiring with the sun to ruin my sleep.",
    "Have you ever had a conversation with a potato chip?",
    "I just realized my shoes are secretly judging my dance moves.",
    "My chair tried to tell me a joke, but I didn’t get it.",
    "I think my pet hamster might be plotting to start a band.",
    "Do you think spiders hold meetings when we’re not around?",
    "I once met a snail who claimed to be an Olympic athlete.",
    "I’m convinced my mirror is showing me someone else’s reflection.",
    "The last time I saw a banana, it was in a detective movie.",
    "Do you think trees ever get tired of standing still?",
    "I’m secretly trying to teach my fridge how to talk, but it’s stubborn.",
    "The pizza delivery guy just told me he was a ninja. Should I trust him?",
    "I swear the moon has been watching me all week.",
    "I found a pair of sunglasses that belong to a mysterious cat. Should I return them?",
    "I just signed up for a mystery cult and now I’m wondering what kind of ceremony I’m getting into tonight.",
    "I tried to get into a fight with a vending machine and it won. Now I’m questioning my life choices.",
    "I’m stuck in traffic and the guy next to me is blasting Barbie Girl at full volume. It’s getting weird.",
    "Just realized I have a hole in my pocket and I'm way too drunk to deal with this right now.",
    "I just texted my ex to tell them I miss them... and then accidentally sent it to my mom.",
    "I’ve been invited to a ‘strictly no clothes’ party. Do you think that’s an invitation or a trap?",
    "I’m pretty sure I just broke into a stranger's house... but I think they invited me. Or at least their dog did.",
    "I’ve got a bag of marshmallows and an open window... and I’m not sure which one I’m more excited about.",
    "Okay, so the guy who just offered me $5 to help him hide something definitely didn’t mean a puppy.",
    "I’m at a karaoke bar right now, and I’m about to sing Bohemian Rhapsody. Pray for me.",
    "I’m sitting in a coffee shop and just found out I’m being watched by a guy in a bear costume. Should I be concerned?",
    "I may or may not have just convinced someone to follow me into an alley… it was for science, I swear.",
    "So I just bought a pet ferret… but I can’t decide if I want to train it or just let it ruin my life.",
    "I’ve been pretending to be a tourist in my own city for an hour, and I’m starting to feel way too comfortable.",
    "I tried to join a flash mob today, but I think they might have mistaken me for the guy who’s bad at dancing.",
    "I accidentally made eye contact with someone while buying cheese, and now we’re both pretending we didn’t just have a moment.",
    "I just made the mistake of offering to help a stranger find their car… but now I’m in a parking lot full of different strangers.",
    "I'm stuck at a party and everyone’s pretending to be pirates. I don't know if I'm having fun or just scared.",
    "I’m pretty sure my cat just set up an elaborate trap involving yarn and a dog. Should I intervene?",
    "I just sent a text to the wrong person, and now I'm trying to figure out if I should just ghost them forever.",
    "I just walked into a room full of people, and somehow I'm now holding a broom and pretending to sweep.",
    "I was walking through a mall and now I’m inside a store that sells only purple things. What is my life?",
    "I just tried to break into a hotel room with my own keycard. I think I might be having an identity crisis.",
    "I tried to join a circus today. I don’t know if they liked me, but they did offer me a broom and a clown nose.",
    "I just got a text from a number I don’t recognize and it says ‘Are you ready to confess?’ I’m both terrified and intrigued.",
    "I'm pretty sure I just entered a secret society after nodding to someone in a trench coat. I might need help.",
    "I’m at a bar right now, and some guy just bet me $10 I can’t do a cartwheel. Should I take him up on it?",
    "So, I might’ve just given my number to someone who was wearing a lobster costume... but I’m not sure if it was real.",
    "I just entered an elevator and accidentally became part of a hostage situation. How do I get out of this?",
    "I'm at a pet store, and I just bought a hamster and a cactus. Don’t ask me why, just trust that it felt right.",
    "So, I may or may not have broken into an abandoned amusement park with a bunch of strangers. I’m thinking about leaving, but there’s popcorn.",
    "I just walked into a bar and someone handed me a map. Now I’m supposed to find the treasure, apparently.",
    "I’m sitting in a dark room with a bunch of people wearing sunglasses at night. I think I’m either being pranked or recruited.",
    "I tried to do a magic trick with a deck of cards, but now everyone’s concerned about where the queen went.",
    "I just found a wallet full of cash on the ground and now I’m debating whether to keep it or turn it into a really bad decision.",
    "I just received an invite to a ‘no rules’ dinner party. Do you think this is a code for something illegal?",
    "I just ordered something off the internet and now I’m waiting for it to arrive—pray it’s not a giant inflatable something.",
    "I accidentally walked into an online meetup, and now I’m stuck with a bunch of strangers who think I’m their new therapist.",
    "I thought I was getting a massage, but now there’s a man in a suit asking if I’m ready for a ‘business opportunity.’",
    "I’m at a club, and the DJ just played a song I definitely wasn’t ready for.",
    "I just got roped into a blindfolded scavenger hunt. Why do I feel like this is a trap?",
    "I was trying to buy a burrito and ended up buying a chicken costume instead. Is this a sign?",
    "I just got invited to a house party that I’m 99% sure is a front for something way weirder.",
    "So, I just got into a heated argument with a mannequin in a store. Long story.",
    "I was offered a chance to join a cult today. Do you think I should be concerned?",
    "So, I just realized I’m locked in a room with a clown, and I’m starting to wonder if this is a prank or a test.",
    "I tried to set up a Tinder date, and now it looks like we’re both stuck in an escape room together.",
    "I was offered free pizza at a party, but now I’m convinced it’s a lure for something much more sinister.",
    "I just saw a guy juggling flaming swords and then he handed me one. Should I be honored or terrified?",
    "I just gave a complete stranger my phone number because they asked if I was ‘in need of an adventure.’",
]
