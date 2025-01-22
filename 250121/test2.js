// 입력값
const IdElement = document.getElementById("inputId");
const AgeElement = document.getElementById("inputAge");
const CareerElement = document.getElementById("inputCareer");
const NicknameElement = document.getElementById("inputNickname");
const NameElement = document.getElementById("inputName");

// localstorage에서 불러오기
let data_map = JSON.parse(localStorage.getItem("data_map")) || [];

// 테이블 헤드 생성
const tableWrap = document.querySelector(".main-wrap");
tableWrap.innerHTML = ` 
<table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
        <th>커리어</th>
        <th>별명</th>
        <th>관리</th>
      </tr>
    </thead>
    <tbody class="tBody"></tbody>
</table> `;

// 테이블 바디 생성 함수
function dataPrint() {
  const tBBody = document.querySelector(".tBody");
  tBBody.innerHTML = data_map
    .map((item, index) => {
      return `
      <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.career}</td>
        <td>${item.nickname}</td>
        <td>
        <button class="btnCor" index = ${index}>수정</button>
        <button class="btnDel" index = ${index}>삭제</button>
        </td>
      </tr>
      `;
    })
    .join("");

  const deleteBtns = document.querySelectorAll(".btnDel");
  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", function () {
      const deletedData = data_map.toSpliced(index, 1);
      console.log(deletedData);
      const deletedArr = JSON.stringify([...deletedData]);
      localStorage.setItem(`${index}`, deletedArr);
      console.log(deletedArr);

      window.location.reload(); // 창 새로고침.
      dataPrint();
    });
  });
}
let id_check = false;
let age_check = false;
let nickname_check = false;
let career_check = false;

//활성화
function btnDisabled() {
  const saveButton = document.querySelector(".saveBtn");

  if (id_check && age_check && nickname_check && career_check) {
    saveButton.disabled = false; // 활성화
  } else {
    saveButton.disabled = true; // 비활성화
  }
}

//Id
function myIdFunction() {
  // 출력
  const userIdElement = document.querySelector("#idDuplication");
  const Id = document.getElementById("inputId").value;

  //중복
  let isduplication = data_map.some((item) => item.userid === Id);
  if (isduplication) {
    userIdElement.innerText = "아이디중복";
  } else {
    userIdElement.innerText = Id;
    id_check = true;
  }
  btnDisabled();
}

//Nickname
function myNicknameFunction() {
  // 출력
  const userNicknameElement = document.querySelector("#max2Duplication");
  const Nickname = document.getElementById("inputNickname").value;

  let isduplication1 = data_map.some((item) => item.nickname === Nickname);

  if (isduplication1) {
    userNicknameElement.innerText = "닉네임중복";
  } else if (Nickname.length < 2) {
    userNicknameElement.innerText = "2자 이상 입력해야 해요";
  } else {
    userNicknameElement.innerText = Nickname;
    nickname_check = true;
  }
  btnDisabled();
}

//age
function myAgeFunction() {
  const userNumberElement = document.querySelector("#numberType");
  const Age = document.getElementById("inputAge").value;
  if (Age > 150) {
    userNumberElement.innerText = "151살 이상은 안돼요";
  } else {
    userNumberElement.innerText = Age;
    age_check = true;
  }
  btnDisabled();
}

//career
function myCareerFunction() {
  const userCareerElement = document.querySelector("#max15");
  const Career = document.getElementById("inputCareer").value;

  if (Career.length < 15) {
    userCareerElement.innerText = "15자 이상 입력해야 해요";
  } else {
    userCareerElement.innerText = Career;
    career_check = true;
  }
  btnDisabled();
}

document.addEventListener("DOMContentLoaded", function () {
  //버튼
  const saveButton = document.querySelector(".saveBtn");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      let userInfo = {
        userid: IdElement.value,
        name: NameElement.value,
        age: AgeElement.value,
        career: CareerElement.value,
        nickname: NicknameElement.value,
      };

      data_map.push(userInfo);
      window.localStorage.setItem("data_map", JSON.stringify(data_map));
      dataPrint();

      IdElement.value = "";
      NameElement.value = "";
      AgeElement.value = "";
      CareerElement.value = "";
      NicknameElement.value = "";
    });
  }
  dataPrint();
});
