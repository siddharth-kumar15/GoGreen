import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// 🔁 New date range: 1 Jan 2020 → 30 July 2025
const START_DATE = moment("2020-01-01");
const END_DATE = moment("2025-07-30");

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 344); // ~344 weeks from Jan 2020 to July 2025
  const y = random.int(0, 6);   // 0 to 6 days

  const date = START_DATE.clone().add(x, "w").add(y, "d");

  if (date.isAfter(END_DATE)) return makeCommits(n);  

  const formattedDate = date.format();
  console.log(formattedDate);

  const data = { date: formattedDate };

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(formattedDate, { "--date": formattedDate }, makeCommits.bind(this, --n));
  });
};

// 🟢 Number of commits (increase to fill contribution graph)
makeCommits(1000);
 
