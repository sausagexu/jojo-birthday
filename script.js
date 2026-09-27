const wakeButton = document.querySelector(".wake-button");
const sleepBg = document.querySelector(".sleep-bg");
const eyeMask = document.querySelector(".eye-mask");
const eyeOpening = document.querySelector(".eye-opening");
const phoneButton = document.querySelector(".phone-button");
const phoneScene = document.querySelector(".phone-scene");
const unlockButton = document.querySelector(".unlock-button");
const unlockHint = document.querySelector(".unlock-hint");
const phoneDesktop = document.querySelector(".phone-desktop");

wakeButton.addEventListener("click", function () {
    const birthdayBgm = document.querySelector("#birthday-bgm");
    birthdayBgm.volume = 0.35;
    birthdayBgm.currentTime = 0;
    birthdayBgm.play();

    // 1. 起床按钮消失
    wakeButton.style.display = "none";

    // 2. 立刻盖上黑色眼皮
    eyeMask.style.display = "block";

    // 3. 黑屏的时候偷偷换成醒来后的房间
    setTimeout(function () {
        sleepBg.src = "./images/opening/awake.png";
    }, 300);

    // 4. 停顿一下，然后开始睁眼
    setTimeout(function () {

        eyeOpening.animate(
            [
                { ry: 0 },
                { ry: 3 },
                { ry: 8 },
                { ry: 18 },
                { ry: 35 },
                { ry: 65 }
            ],
            {
                duration: 1600,
                easing: "ease-out",
                fill: "forwards"
            }
        );

    }, 600);

    // 5. 睁眼结束后，把黑色遮罩彻底拿走
    setTimeout(function () {
    eyeMask.style.display = "none";

    // 睁眼结束后，出现“拿起手机”
    phoneButton.classList.add("show");

}, 2250);
});


phoneButton.addEventListener("click", function () {

    // “拿起手机”按钮消失
    phoneButton.style.display = "none";

    // 手机出现
    phoneScene.classList.add("show");

});
unlockButton.addEventListener("click", function () {

    // 显示手机桌面
    phoneDesktop.classList.add("show");

    // 解锁以后，点击区域和提示消失
    unlockButton.style.display = "none";
    unlockHint.style.display = "none";

});
const sausageApp = document.querySelector("#sausage-app");
const gameStartScreen = document.querySelector("#game-start-screen");
const gameStartButton = document.querySelector(".game-start-button");
const catchGame = document.querySelector("#catch-game");
const gameClearScreen = document.querySelector("#game-clear-screen");
const nextButton = document.querySelector(".next-button");
const quizApp = document.querySelector("#quiz-app");

sausageApp.addEventListener("click", function () {
    phoneDesktop.style.display = "none";
    gameStartScreen.classList.add("show");
});
gameStartButton.addEventListener("click", function () {
    gameStartScreen.classList.remove("show");
    catchGame.classList.add("show");

    score = 0;
gameScore.textContent = "SCORE 0 / 10";

    dropTestGift();

    dropInterval =setInterval(function () {
        dropTestGift();
    }, 1200);
});
const sausagePlayer = document.querySelector(".sausage-player");
const catchArea = document.querySelector(".catch-area");
const gameScore = document.querySelector("#game-score");
let score = 0;
let dropInterval;

let isDragging = false;

sausagePlayer.addEventListener("pointerdown", function (event) {
    isDragging = true;
    sausagePlayer.setPointerCapture(event.pointerId);
});

sausagePlayer.addEventListener("pointermove", function (event) {
    if (!isDragging) {
        return;
    }

    const areaRect = catchArea.getBoundingClientRect();

    let newX = event.clientX - areaRect.left;

    const dogWidth = sausagePlayer.offsetWidth;

    const minX = dogWidth / 2;
    const maxX = areaRect.width - dogWidth / 2;

    if (newX < minX) {
        newX = minX;
    }

    if (newX > maxX) {
        newX = maxX;
    }

    sausagePlayer.style.left = newX + "px";
});

sausagePlayer.addEventListener("pointerup", function () {
    isDragging = false;
});

sausagePlayer.addEventListener("pointercancel", function () {
    isDragging = false;
});
function dropTestGift() {

    const gift = document.createElement("div");
    gift.classList.add("falling-item");

    const goodItems = ["♫", "★", "♡"];
    const badItems = ["✖", "☂", "⊗"];

    const isGood = Math.random() < 0.7;

    let itemList;

    if (isGood) {
        itemList = goodItems;
    } else {
        itemList = badItems;
    }

    const randomItem =
        itemList[Math.floor(Math.random() * itemList.length)];

    gift.textContent = randomItem;

    catchArea.appendChild(gift);

    const maxX = catchArea.clientWidth - 30;
    const randomX = Math.random() * maxX;

    gift.style.left = randomX + "px";

    const fallAnimation = gift.animate(
        [
            { top: "-30px" },
            { top: catchArea.clientHeight + "px" }
        ],
        {
            duration: 3000,
            easing: "linear",
            fill: "forwards"
        }
    );

    const collisionCheck = setInterval(function () {

        const giftRect = gift.getBoundingClientRect();
        const dogRect = sausagePlayer.getBoundingClientRect();

        const isTouching =
            giftRect.right > dogRect.left &&
            giftRect.left < dogRect.right &&
            giftRect.bottom > dogRect.top &&
            giftRect.top < dogRect.bottom;

       if (isTouching) {

    if (isGood) {
        score = score + 1;
        gameScore.textContent = "SCORE " + score + " / 10";

        if (score >= 10) {
    clearInterval(dropInterval);

    catchGame.classList.remove("show");
    gameClearScreen.classList.add("show");
}
    }

    clearInterval(collisionCheck);
    fallAnimation.cancel();
    gift.remove();
}

}, 30);

    fallAnimation.onfinish = function () {
        clearInterval(collisionCheck);
        gift.remove();
    };
}
nextButton.addEventListener("click", function () {

    gameClearScreen.classList.remove("show");

    phoneDesktop.style.display = "block";
    phoneDesktop.classList.add("show");
    quizApp.classList.remove("locked");

});
const quizStartScreen = document.querySelector("#quiz-start-screen");

quizApp.addEventListener("click", function () {

    phoneDesktop.style.display = "none";

    quizStartScreen.classList.add("show");

});
const quizStartButton = document.querySelector(".quiz-start-button");
const quizGame = document.querySelector("#quiz-game");

quizStartButton.addEventListener("click", function () {

    quizStartScreen.classList.remove("show");

    quizGame.classList.add("show");

});
const correctAnswer = document.querySelector(".correct-answer");
const wrongAnswer = document.querySelector(".wrong-answer");
const quizNextButton = document.querySelector(".quiz-next-button");

correctAnswer.addEventListener("click", function () {
    correctAnswer.textContent = "✓ CORRECT 最爱JOJO~";

quizNextButton.classList.add("show");
});

wrongAnswer.addEventListener("click", function () {
    wrongAnswer.textContent = "✗ 你再想想？？？";
});
const questionTwo = document.querySelector("#question-two");

quizNextButton.addEventListener("click", function () {
    quizGame.classList.remove("show");
    questionTwo.classList.add("show");
});
const correctAnswerTwo = document.querySelector(".correct-answer-two");
const wrongAnswerTwo = document.querySelector(".wrong-answer-two");
const nextTwo = document.querySelector(".next-two");

correctAnswerTwo.addEventListener("click", function () {
    correctAnswerTwo.textContent = "✓ CORRECT！去见JOJO！";

    nextTwo.classList.add("show");
});

wrongAnswerTwo.addEventListener("click", function () {
    wrongAnswerTwo.textContent = "✗ 还没到时候！！！";
});
const questionThree = document.querySelector("#question-three");

nextTwo.addEventListener("click", function () {
    questionTwo.classList.remove("show");
    questionThree.classList.add("show");
});
const correctAnswerThree = document.querySelector(".correct-answer-three");
const wrongAnswerThree = document.querySelector(".wrong-answer-three");
const nextThree = document.querySelector(".next-three");

correctAnswerThree.addEventListener("click", function () {
    correctAnswerThree.textContent = "✓ CORRECT！我就知道！";

    nextThree.classList.add("show");
});

wrongAnswerThree.addEventListener("click", function () {
    wrongAnswerThree.textContent = "✗ 再给你一次组织语言的机会 :)";
});
const quizResultScreen = document.querySelector("#quiz-result-screen");
const quizFinishButton = document.querySelector(".quiz-finish-button");
const photoApp = document.querySelector("#photo-app");

nextThree.addEventListener("click", function () {
    questionThree.classList.remove("show");
    quizResultScreen.classList.add("show");
});
quizFinishButton.addEventListener("click", function () {

    quizResultScreen.classList.remove("show");

    phoneDesktop.style.display = "block";
    phoneDesktop.classList.add("show");

    photoApp.classList.remove("locked");

});
const photoStartScreen = document.querySelector("#photo-start-screen");

photoApp.addEventListener("click", function () {
    phoneDesktop.style.display = "none";
    phoneDesktop.classList.remove("show");

    photoCount = 0;
cameraShutterButton.disabled = false;

    photoStartScreen.classList.add("show");
});
const photoStartButton = document.querySelector(".photo-start-button");
const photoCameraScreen = document.querySelector("#photo-camera-screen");

photoStartButton.addEventListener("click", function () {
    photoStartScreen.classList.remove("show");
    photoCameraScreen.classList.add("show");
});

const cameraShutterButton = document.querySelector(".camera-shutter-button");

let photoCount = 0;

cameraShutterButton.addEventListener("click", function () {

    photoCount = photoCount + 1;

    photoCameraScreen.style.filter = "brightness(2.5)";

    setTimeout(function () {
        photoCameraScreen.style.filter = "brightness(1)";
    }, 150);

   if (photoCount >= 4) {
    cameraShutterButton.disabled = true;

    setTimeout(function () {

        // 关闭拍照页面
        photoCameraScreen.classList.remove("show");

        // 打开打印页面
        const photoPrintingScreen =
            document.querySelector("#photo-printing-screen");

        photoPrintingScreen.classList.add("show");

        // 3秒后：关闭打印页面，打开最终成片
        setTimeout(function () {

            photoPrintingScreen.classList.remove("show");

            const photoFinalScreen =
                document.querySelector("#photo-final-screen");

            photoFinalScreen.style.display = "flex";
            photoFinalScreen.classList.add("show");

        }, 3000);

    }, 500);
}

});
const photoFinalNext = document.querySelector(".photo-final-next");

photoFinalNext.addEventListener("click", function () {
    const photoFinalScreen = document.querySelector("#photo-final-screen");

    // 关闭最终成片页面
    photoFinalScreen.classList.remove("show");
    photoFinalScreen.style.display = "none";

    // 回到手机桌面
    phoneDesktop.style.display = "block";
    phoneDesktop.classList.add("show");
    const giftApp = document.querySelector("#gift-app");
giftApp.classList.remove("locked");
});
const giftAppButton = document.querySelector("#gift-app");
const giftScreen = document.querySelector("#gift-screen");

giftAppButton.addEventListener("click", function () {

    // 还没解锁时，不允许打开
    if (giftAppButton.classList.contains("locked")) {
        return;
    }

    // 隐藏手机桌面
    phoneDesktop.style.display = "none";
    phoneDesktop.classList.remove("show");

    // 打开最后的礼物页面
    giftScreen.classList.add("show");
});
const giftOpenButton = document.querySelector(".gift-open-button");
const letterScreen = document.querySelector("#letter-screen");

giftOpenButton.addEventListener("click", function () {

    // 关闭礼物入口页面
    giftScreen.classList.remove("show");

    // 打开生日信
    letterScreen.classList.add("show");

    // 每次打开都从信的最上面开始看
    letterScreen.scrollTop = 0;
});
const birthdayRestartButton =
    document.querySelector(".birthday-restart-button");

birthdayRestartButton.addEventListener("click", function () {
    window.location.reload();
});
const musicToggle = document.querySelector("#music-toggle");
const birthdayBgmControl = document.querySelector("#birthday-bgm");

musicToggle.addEventListener("click", function () {

    if (birthdayBgmControl.paused) {
        birthdayBgmControl.play();
        musicToggle.textContent = "♫ ON";
    } else {
        birthdayBgmControl.pause();
        musicToggle.textContent = "♫ OFF";
    }

});