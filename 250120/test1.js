// 입력값
const IdElement = document.getElementById("inputId");
const NameElement = document.getElementById("inputName");
const AgeElement = document.getElementById("inputAge");
const CareerElement = document.getElementById("inputCareer");
const NicenameElement = document.getElementById("inputNickname");

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
      </tr>
    </thead>
    <tbody>
    </tbody>
</table> `;

// 테이블 바디 생성 함수
function dataPrint() {
  const tBody = document.querySelector("tbody");
  tBody.innerHTML = "";

  data_map.forEach((ele) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.innerText = ele.name;
    const tdAge = document.createElement("td");
    tdAge.innerText = ele.age;
    const tdCareer = document.createElement("td");
    tdCareer.innerText = ele.career;
    const tdNickname = document.createElement("td");
    tdNickname.innerText = ele.nickname;

    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdCareer);
    tr.appendChild(tdNickname);

    document.querySelector("tbody").appendChild(tr);
  });
}

// 버튼 클릭
document.addEventListener("DOMContentLoaded", function () {
  dataPrint();

  //버튼
  const saveButton = document.querySelector(".saveBtn");

  // 출력 div
  const userIdElement = document.querySelector("#idDuplication");
  const userCareerElement = document.querySelector("#max15");
  const userNicknameElement = document.querySelector("#max2Duplication");
  const userNicknameElement2 = document.querySelector("#max2Duplication2");
  const userNumberElement = document.querySelector("#numberType");

  if (saveButton) {
    saveButton.addEventListener("click", function () {
      let userInfo = {
        userid: IdElement.value,
        name: NameElement.value,
        age: AgeElement.value,
        career: CareerElement.value,
        nickname: NicenameElement.value,
      };

      //중복
      let isduplication = data_map.some(
        (item) => item.userid === userInfo.userid
      );
      let isduplication1 = data_map.some(
        (item) => item.nickname === userInfo.nickname
      );

      if (
        isduplication ||
        isduplication1 ||
        CareerElement.value.length < 15 ||
        NicenameElement.value.length < 2 ||
        AgeElement.value > 150
      ) {
        if (isduplication) {
          userIdElement.innerText = "아이디중복";
        } else {
          userIdElement.innerText = "";
        }

        if (isduplication1) {
          userNicknameElement2.innerText = "닉네임중복";
        } else {
          userNicknameElement2.innerText = "";
        }

        if (CareerElement.value.length < 15) {
          userCareerElement.innerText = "15자 이상 입력해야 해요";
        } else {
          userCareerElement.innerText = "";
        }

        if (NicenameElement.value.length < 2) {
          userNicknameElement.innerText = "2자 이상 입력해야 해요";
        } else {
          userNicknameElement.innerText = "";
        }

        if (AgeElement.value > 150) {
          userNumberElement.innerText = "151살 이상은 안돼요";
        } else {
          userNumberElement.innerText = "";
        }
        return;
      }

      userIdElement.innerText = "";
      userNicknameElement2.innerText = "";
      userCareerElement.innerText = "";
      userNicknameElement.innerText = "";
      userNumberElement.innerText = "";

      data_map.push(userInfo);
      window.localStorage.setItem("data_map", JSON.stringify(data_map));
      dataPrint();

      IdElement.value = "";
      NameElement.value = "";
      AgeElement.value = "";
      CareerElement.value = "";
      NicenameElement.value = "";
    });
  }
});
