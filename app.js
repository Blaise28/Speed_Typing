const time = document.querySelector(".time");
const text = document.querySelector(".cont_typing_text .text");
const typing_zone = document.querySelector(".cont_typing_text textarea");
const spinner = document.querySelector(".spinner");

const url_api = "https://api.quotable.io/random";

typing_zone.addEventListener("input", () => {
  const array_quote = text.querySelectorAll("span");
  const array_value = typing_zone.value.split("");
  let correct = true;

  array_quote.forEach((character_span, index) => {
    const character = array_value[index];

    if (character == null) {
      character_span.classList.remove("correct");
      character_span.classList.remove("incorrect");
      correct = false;
    } else if (character === character_span.innerText) {
      character_span.classList.add("correct");
      character_span.classList.remove("incorrect");
    } else {
      character_span.classList.remove("correct");
      character_span.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
      modal_window(); 
      reset_chrono();
      typing_zone.value = "";
  }
});

function modal_window(){
    swal({
        title: "Vous avez reussi",
        text: `${time.innerText}`,
        icon: "success",
        button: "OK",
    }).then(()=>{
        fetch_data();
    });
  }
async function fetch_data() {
  spinner.classList.add("active");

  const response = await fetch(url_api);

  if (response.ok) {
    const data = await response.json();
    new_quotable(data.content);
  } else {
    console.log("error");
  }

  spinner.classList.remove("active");
}

fetch_data();

function new_quotable(new_text) {
  text.textContent = "";
  new_text.split("").forEach((character) => {
    const char_span = document.createElement("span");
    char_span.textContent = character;
    text.appendChild(char_span);
  });

  defilerTemps();
}

let sec = 0,
  min = 0,
  hours = 0;
let timeout;
let is_stop = false;

const defilerTemps = () => {
  sec = parseInt(sec);
  min = parseInt(min);
  hours = parseInt(hours);

  sec++;
  if (sec === 60) {
    min++;
    sec = 0;
  }
  if (min === 60) {
    hours++;
    min = 0;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  time.textContent = `${hours}:${min}:${sec}`;

  timeout = setTimeout(defilerTemps, 1000);
};

function reset_chrono() {
  time.innerText = "00:00:00";
  hours = 0;
  min = 0;
  sec = 0;
  clearTimeout(timeout);
}