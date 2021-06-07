const thanosFingerImg = document.getElementById("thanos_finger");
const thanosNormalImg = document.getElementById("thanos_normal");
const choiceInput = document.getElementById("choice_input");
const fingerSnapBtn = document.getElementById("finger_snap_btn");
const fingerSnapSound = document.getElementById("finger_snap_sound");


// chice list가 비어있다면(선택지가 없다면) 핑거스냅 버튼은 비활성화 된다.
const fingerSnapBtnTrigger = () => {
    if ($('.choice')) {
        fingerSnapBtn.disabled = false;
    } else {
        fingerSnapBtn.disabled = true;
    }
}

const enterKey = () =>{
    if (window.event.keyCode == 13) {
        choiceListUpFunc()
    }
}
function choiceListUpFunc(){
    if(!choiceInput.value){
        alert("Bring Me Options!!!!!!!!!")
        
    }else{
        const div = document.createElement("div");
        let node = document.createTextNode(choiceInput.value);
        div.appendChild(node);
        const choiceList = document.getElementById('choice_list');
        choiceList.appendChild(div);
        div.classList.add("choice");

        choiceInput.value = "";
        fingerSnapBtnTrigger();

    }
}

function noSpaceForm(obj){             
    const str_space = /\s/;               
    if(str_space.exec(obj.value)) {     
        obj.focus();
        obj.value = obj.value.replace(' ',''); 
        return false;
    }
}

// fingersnap 버튼 동작 함수
fingerSnapBtn.addEventListener("click", () => {
    fingerSnapBtn.disabled = true;
    imgToggle();
    setTimeout(() => {
        removeChoice();
    }, 3000)
    fingerSnapBtnTrigger();
});

// 이미지 토글 함수
const imgToggle = () => {
    $("#finger_snap_btn").toggle();
    $(".info_balloon").toggle();

    setTimeout(() => {
        $('#thanos_normal').fadeOut(200, function () {
            $("#thanos_finger").fadeIn(2000, function () {
                fingerSnapSound.play();

                $("#thanos_finger").toggle();
                $('#thanos_normal').show();
                $("#finger_snap_btn").toggle();
                $(".info_balloon").toggle();

            });
        });
    }, 500)
}

// 선택지 절반 제거 함수
const removeChoice = () => {
    //childElementCount => 자식 요소의 개수를 반환하는 속성.

    let choiceNum = document.getElementById('choice_list').childElementCount;
    let halfChoiceNum = Math.floor(choiceNum / 2);
    console.log(halfChoiceNum);
    for (let i = 0; i <= halfChoiceNum - 1; i++) {
        let choiceNumLength = Math.floor(Math.random() * choiceNum);
        $("#choice_list").children().eq(choiceNumLength).remove();
        // choiceNum의 개수에 대해 재선언 해줘야 한다. 총 choice의 개수가 1개 줄어들었기 때문이다.
        choiceNum = document.getElementById('choice_list').childElementCount;
    }
}