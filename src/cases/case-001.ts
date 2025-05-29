import type { Case } from "../types";

const vanishingBriefcaseCase: Case = {
  id: "case-001",
  title: "The Vanishing Briefcase",
  difficulty: 1, // Easy (3 steps)
  description:
    "A briefcase containing sensitive documents has vanished from the Blue Note Lounge. Follow the clues to identify the thief.",
  xpReward: 50,
  completed: false,
  isNew: false,
  category: "beginner",
  brief:
    "Set in the gritty 1980s, a valuable briefcase has disappeared from the Blue Note Lounge. A witness reported that a man in a trench coat was seen fleeing the scene. Investigate the crime scene, review the list of suspects, and examine interview transcripts to reveal the culprit.",
  objectives: [
    "Retrieve the correct crime scene details to gather the key clue.",
    "Identify the suspect whose profile matches the witness description.",
    "Verify the suspect using their interview transcript.",
  ],
  solution: {
    answer: "Vincent Malone",
    successMessage:
      "Congratulations, detective! You have successfully identified Vincent Malone as the culprit.",
    explanation: `First, you retrieved the crime scene details from the 'crime_scene' table which mentioned a man in a trench coat with a scar on his left cheek. Next, querying the 'suspects' table narrowed the field down to two individuals. Finally, examining the 'interviews' table confirmed that Vincent Malone indeed stole the briefcase.`,
  },
};

export default vanishingBriefcaseCase;
