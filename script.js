// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  // image 넣기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 제목 넣기
  const title = document.createElement("a"); // a 요소 만들기
  title.href = obj.url; // url 속성 주기
  title.textContent = obj.title;
  discussionTitle.append(title);
  discussionContent.append(discussionTitle);

  // id, 작성시간 넣기 넣기
  const info = document.createElement("div");
  info.className = "discussion__information";
  info.textContent = obj.id + " / " + obj.createdAt;
  discussionContent.append(info);

  // 체크박스 넣기

  const checkbox = document.createElement("p");
  checkbox.className = "check";
  checkbox.textContent = "☑";
  discussionAnswered.append(checkbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};
// 로컬 저장소에 저장된 데이터를 가져옴
let savedDisscussions = localStorage.getItem("info");
// 문자열 형태를 객체형태로 변환
let newDiscussions = JSON.parse(savedDisscussions);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수
const render = (element) => {
  if (newDiscussions) {
    for (let i = 0; i < newDiscussions.length; i += 1) {
      element.append(convertToDiscussion(newDiscussions[i]));
    }
    return;
  } else {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//  li.append(avatarWrapper, discussionContent, discussionAnswered);

const input = document.querySelector(".form__container");
const askBtn = document.querySelector(".askBtn");
const cancel = document.querySelector(".cancel");

cancel.addEventListener("click", (event) => {
  console.log(event.target);
  input.setAttribute("style", "display :none;");
});

askBtn.addEventListener("click", (event) => {
  console.log(event.target);
  input.removeAttribute("style");
});

// 현재 시간 맞추기
const time = new Date();
let currentTime = "";
let hour = time.getHours();
let minute = time.getMinutes();
if (minute < 10) {
  if (hour < 12) {
    currentTime = `오전 ${hour}: 0${minute}`;
  } else if (hour >= 12) {
    currentTime = `오후 ${hour}:0${minute}`;
  }
} else {
  if (hour < 12) {
    currentTime = `오전 ${hour}: ${minute}`;
  } else if (hour >= 12) {
    currentTime = `오후 ${hour}:${minute}`;
  }
}
console.log(currentTime);
// 새로운 질문 추가
const id = document.querySelector("#name");
const title = document.querySelector("#name2");
const text = document.querySelector("#story");
const btn = document.querySelector(".form__submit");

btn.addEventListener("click", () => {
  console.log(id.value);
  console.log(title.value);
  console.log(text.value);

  const addObj = {
    id: "lmh",
    createdAt: "오전 11:30",
    title: "테스트 입니다.",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    avatarUrl: "./img/img1.png",
  };
  addObj["id"] = id.value;
  addObj["createdAt"] = currentTime;
  addObj["title"] = title.value;
  addObj["text"] = text.value;

  agoraStatesDiscussions.unshift(addObj);

  // 로컬 저장소에 수정된 데이터 추가(배열은 입력이 되지 않으므로 문자열로 변환 후 추가)
  localStorage.setItem("info", JSON.stringify(agoraStatesDiscussions));
  console.log(agoraStatesDiscussions);
  const ul = document.querySelector("ul.discussions__container");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  render(ul);
  location.reload();

  id.value = "";
  title.value = "";
  text.value = "";
  input.setAttribute("style", "display :none;");
});

const check1 = document.querySelectorAll(".check");
let check = Array.from(check1);

for (let i in check) {
  check[i].addEventListener("click", (event) => {
    console.log(event.target);

    savedDisscussions = localStorage.getItem("info");
    newDiscussions = JSON.parse(savedDisscussions);
    console.log(newDiscussions);

    if (newDiscussions) {
      newDiscussions.splice(i, 1);
      localStorage.setItem("info", JSON.stringify(newDiscussions));

      render(ul);
      location.reload();
    } else {
      newDiscussions = agoraStatesDiscussions;
      newDiscussions.splice(i, 1);
      console.log(newDiscussions);
      localStorage.setItem("info", JSON.stringify(newDiscussions));
      location.reload();

      render(ul);
    }
  });
}

// 페이징
