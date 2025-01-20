// 입력값
const IdElement = document.getElementById("inputId");
const NameElement = document.getElementById("inputName");
const AgeElement = document.getElementById("inputAge");
const CareerElement = document.getElementById("inputCareer");
const NicenameElement = document.getElementById("inputNickname");
// 출력 div
const userIdElement = document.querySelector(".userId");
const userNameElement = document.querySelector(".userName");
const userAgeElement = document.querySelector(".userAge");
const userCareerElement = document.querySelector(".userCareer");
const userNicenameElement = document.querySelector(".userNickname");

let data_map = [];

// 버튼 클릭
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".saveBtn");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      let userInfo = {
        userid: IdElement.value,
        name: NameElement.value,
        age: AgeElement.value,
        career: CareerElement.value,
        nickname: NicenameElement.value,
      };
      data_map.push(userInfo);
      window.localStorage.setItem("data_map", JSON.stringify(data_map));
      const userTransformInfo = JSON.parse(localStorage.getItem("data_map"));

      userTransformInfo.map((user) => {
        // table 만들기
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.textContent = `${user.name}`;
        const tdAge = document.createElement("td");
        tdAge.textContent = `${user.age}`;
        const tdCareer = document.createElement("td");
        tdCareer.textContent = `${user.career}`;
        const tdNickname = document.createElement("td");
        tdNickname.textContent = `${user.nickname}`;

        tr.appendChild(tdName);
        tr.appendChild(tdAge);
        tr.appendChild(tdCareer);
        tr.appendChild(tdNickname);

        document.querySelector("tbody").appendChild(tr);

        IdElement.value = null;
        NameElement.value = null;
        AgeElement.value = null;
        CareerElement.value = null;
        NicenameElement.value = null;
      });
    });
  }
});

// 테이블 생성
const tableWrap = document.querySelector(".main-wrap");

tableWrap.innerHTML = ` 
<table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
        <th>커리어</th>
        <th>별명</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table> `;
