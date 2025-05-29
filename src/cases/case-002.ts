import type { Case } from "../types";

const theStolenSound: Case = {
  id: "case-002",
  title: "The Stolen Sound",
  difficulty: 1, // Beginner-friendly (4 steps)
  description:
    "A prized vinyl record has been stolen from West Hollywood Records. Follow the clues to uncover the culprit.",
  xpReward: 100,
  completed: false,
  isNew: false,
  category: "beginner",
  brief: `In the neon glow of 1980s Los Angeles, the West Hollywood Records store was rocked by a daring theft. A prized vinyl record, worth over $10,000, vanished during a busy evening, leaving the store owner desperate for answers.
Vaguely recalling the details, you know the incident occurred on July 15, 1983, at this famous store. Your task is to track down the thief and bring them to justice.`,
  objectives: [
    "Retrieve the crime scene report for the record theft using the known date and location.",
    "Retrieve witness records linked to that crime scene to obtain their clues.",
    "Use the clues from the witnesses to find the suspect in the suspects table.",
    "Retrieve the suspect's interview transcript to confirm the confession.",
  ],
  solution: {
    answer: "Rico Delgado",
    successMessage:
      "Excellent work, detective! Rico Delgado has confessed to stealing the prized vinyl record.",
    explanation: `You began by querying the 'crime_scene' table with the date (19830715) and location (West Hollywood Records)
to find the incident report. Then, you retrieved the two witness records from the 'witnesses' table, which revealed that:
• The suspect wore a red bandana.
• The suspect had a distinctive gold watch.
Next, you queried the 'suspects' table, and there were 3 suspects matching the clues.
Finally, you found the confession from Rico Delgado in the 'interviews' table.`,
  },
};

export default theStolenSound;
