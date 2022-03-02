// 프로그래머스 신고 결과 받기
const id_list1 = ["muzi", "frodo", "apeach", "neo"];
const report1 = [
  "muzi frodo",
  "apeach frodo",
  "frodo neo",
  "muzi neo",
  "apeach muzi",
];
const k = 2;
// 결과 [2,1,1,0]
const is_list2 = ["con", "ryan"];
const report2 = ["ryan con", "ryan con", "ryan con", "ryan con"];

function whoSolution(id_list, report, k) {
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });
  //   console.log(1, reports);
  let counts = new Map();
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }
  //   console.log(2, counts);
  let good = new Map();
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }
  //   console.log(3, good);
  let answer = id_list.map((a) => good.get(a) || 0);
  return answer;
}

// console.log(whoSolution(id_list1, report1, k));

function whoSolution2(id_list, report, k) {
  report = [...new Set(report)];
  const reported = report.map((el) => el.split(" ")[1]);
  console.log(1, reported);
  const reported_final = [];
  const count = new Array(id_list.length).fill(0);
  console.log(2, count);
  reported.forEach((el) => {
    // console.log("in 2 : ", el, id_list.indexOf(el));
    count[id_list.indexOf(el)]++;
  });
  console.log(3, count);
  count.forEach((el, i) => {
    if (el >= k) {
      reported_final.push(id_list[i]);
    }
  });
  console.log(4, reported_final);
  count.fill(0);
  console.log(5, count);
  report.forEach((el) => {
    el = el.split(" ");
    if (reported_final.includes(el[1])) {
      count[id_list.indexOf(el[0])]++;
    }
  });

  return count;
}
console.log(whoSolution2(id_list1, report1, k));

// 나의 풀이
function mySolution(id_list, report, k) {
  var answer = [];
  const removeDuplicationInReport = [...new Set(report)];
  const reportSplit = removeDuplicationInReport.map((user) => user.split(" "));
  const removeAutoInReportSplit = reportSplit.filter((user) =>
    user[0] !== user[1] ? user : null
  );
  const overK = id_list.map((user, index) => {
    const filter = removeAutoInReportSplit.filter((value) => value[1] === user);
    return { name: user, reported: filter.length };
  });
  let overKList = [];
  overK.forEach((user) => {
    if (user.reported >= k) {
      overKList.push(user.name);
    }
  });
  let receiverMail = [];
  for (let overUser of overKList) {
    const check = reportSplit.filter((user) => {
      return user[1] === overUser;
    });
    receiverMail.push(...check);
  }
  let final = [];
  receiverMail.forEach((user) => {
    final.push(user[0]);
  });
  answer = id_list.map((user) => {
    const howMany = final.filter((name) => name === user);
    return howMany.length;
  });
  return answer;
}

// console.log(mySolution(id_list1, report1, k));
