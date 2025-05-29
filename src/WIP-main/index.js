import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Indian Holidays in 2025 (Add/modify for your needs)
const holidays = [
  "2025-01-01", // New Year
  "2025-01-14", // Makar Sankranti
  "2025-01-26", // Republic Day
  "2025-03-17", // Holi
  "2025-03-30", // Good Friday
  "2025-04-10", // Eid-ul-Fitr (tentative)
  "2025-05-01", // Labour Day
  "2025-05-21", // Buddha Purnima
];

// Returns true if date is a holiday
const isHoliday = (date) => holidays.includes(moment(date).format("YYYY-MM-DD"));

// Commit frequency weights for each weekday
const commitProbability = {
  0: 0.1, // Sunday
  1: 0.8, // Monday
  2: 0.5, // Tuesday
  3: 0.7, // Wednesday
  4: 0.6, // Thursday
  5: 0.3, // Friday
  6: 0.1, // Saturday
};

const makeCommits = async () => {
  const git = simpleGit();

  const endDate = moment("2025-05-30", "YYYY-MM-DD");
  const startDate = endDate.clone().subtract(159, "days"); // 160 days total

  for (let date = startDate.clone(); date.isBefore(endDate); date.add(1, "days")) {
    const day = date.day();

    if (isHoliday(date) || random.float(0, 1) > commitProbability[day]) {
      continue; // Skip holidays and low-probability days
    }

    const commitTime = date
      .hour(random.int(9, 17))
      .minute(random.int(0, 59))
      .second(random.int(0, 59));
    const formattedDate = commitTime.format();

    const data = { date: formattedDate };

    console.log(`Creating commit on: ${formattedDate}`);

    await new Promise((resolve) => {
      jsonfile.writeFile(path, data, () => {
        git
          .add([path])
          .commit(`Commit on ${formattedDate}`, { "--date": formattedDate }, resolve);
      });
    });
  }

  await git.push();
};

makeCommits();
