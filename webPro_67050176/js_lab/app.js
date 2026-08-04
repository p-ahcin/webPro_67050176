// ข้อ 1.2
// const inputScore = prompt("input youre score (0 - 100)");
// const score = Number(inputScore);

// if (score < 0 || score > 100) {
//     console.log("valid input");
// }
// else if (score >= 50) {
//     console.log("S")
// }
// else{
//     console.log("U")
// };


// ข้อ 2.1
// let scores = [45, 78, 82, 35, 90];

// console.log("while");
// let i = 0;
// while (i < scores.length) {
//     console.log("index " + i + " is " + scores[i]);
//     i++;
// }

// console.log("\nfor");
// for (let i = 0; i < scores.length; i++) {
//         console.log("index " + i + " is " + scores[i]);
// }

// console.log("\npush");
// scores.push(65, 48);
// console.log("after push is ", scores)

// console.log("\npop");
// scores.pop();
// console.log("after pop is ", scores);

// console.log("\nincludes");
// let has82 = scores.includes(82);
// console.log("has 82 ?: ", has82);
// let has83 = scores.includes(83);
// console.log("has 83 ?: ", has83);

// console.log("\nsort");
// scores.sort((a, b) => a - b); // ฟังก์ชันเปรียบเทียบ (a, b) => a - b เรียงจากน้อยไปมาก
// console.log("ascending order: ", scores);

// ข้อ 2.2
// let students = [
//     { id: 1, name: "Somchai", score: 48 },
//     { id: 2, name: "Somsri", score: 75 },
//     { id: 3, name: "Sompong", score: 32 },
//     { id: 4, name: "Somnak", score: 85 }
// ];

// console.log("foreaach");
// students.forEach((student => {
//     console.log(`name: ${student.name} score: ${student.score}`);
// }));

// console.log("\nmap"); // map จะ duplicate มาเป็น arr ใหม่เลน
// let doubleScores = students.map((student) => {
//     return {
//         id: student.id,
//         name: student.name,
//         score: student.score * 2
//     };
// });
// console.log(doubleScores);

// console.log("\nfilter");
// let passedStudents = students.filter((students) => {
//     return students.score > 50;
// });
// console.log(passedStudents);

// console.log("\nfind");
// let somsri = students.find((student) => {
//     return student.name == "Somsri";
// });
// console.log(somsri);

// ข้อ 3.1
// console.log("regular function")
// function calculateGradeRegular(score) {
//     if (score >= 80) {
//         return "A";
//     }
//     else if (score >= 60) {
//         return "B";
//     }
//     else {
//         return "F";
//     }
// }
// console.log("85 is grade:", calculateGradeRegular(85));
// console.log("65 is grade:", calculateGradeRegular(65));
// console.log("45 is grade:", calculateGradeRegular(45));

// console.log("\narrow function")
// const calculateGradeArrow = (score) => {
//     if (score >= 80) return "A";
//     if (score >= 60) return "B";
//     return "F";
// };
// console.log("85 is grade:", calculateGradeArrow(85));
// console.log("65 is grade:", calculateGradeArrow(65));
// console.log("45 is grade:", calculateGradeArrow(45));

// console.log("\nmap function with students' score")
// let students = [
//     { id: 1, name: "Somchai", score: 48 },
//     { id: 2, name: "Somsri", score: 75 },
//     { id: 3, name: "Sompong", score: 32 },
//     { id: 4, name: "Somnak", score: 85 }
// ];
// let studentsWithGrades = students.map((student) => {
//     return {
//         id: student.id,
//         name: student.name,
//         score: student.score,
//         grade: calculateGradeArrow(student.score)
//     };
// });
// console.log(studentsWithGrades);

// ข้อ 3.2
console.log("mini game")
while(true){
    let input = prompt("ทายเลขลูกเต๋า (1 - 6) หรือพิมพ์ 'exit' (หรือกด Cancel) เพื่อออกจากเกม: ")
    if (input === null || input.toLowerCase() === "exit") {
        console.log("ออกจากเกมเรียบร้อย");
        break;
    }
    let guess = Number(input);

    if (isNaN(guess) || guess < 1 || guess > 6) {
        console.log("กรอกเฉพาะตัวเลข 1 ถึง 6 เท่านั้น");
    } 
    else {
        let diceResult = Math.floor(Math.random() * 6) + 1;
            // Math.random() สุ่มตัวเลขทศนิยมตั้งแต่ 0 - 0.999...
            // คูณ 6 (Math.random() * 6) จะได้ค่า 0 - 5.999...
            // Math.floor() ปัดทศนิยมทิ้ง จะได้เป็นจำนวนเต็ม 0 ถึง 5
            // บวก 1 เป็น 1 ถึง 6
        if (guess === diceResult) {
            console.log(`ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ ${diceResult}`);
        } 
        else {
            console.log(`เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข ${diceResult}`);
        }
    }
}