/* ================= OPEN WEBSITE ================= */

let openBtn = document.getElementById("openBtn");
let welcome = document.getElementById("welcome");
let main = document.getElementById("main");

let birthdayMusic = document.getElementById("birthdayMusic");
let secretMusic = document.getElementById("secretMusic");
let musicBtn = document.getElementById("musicBtn");

openBtn.onclick = function () {

    // إخفاء شاشة البداية
    welcome.style.display = "none";

    // إظهار الموقع
    main.style.display = "block";

    // الرجوع لأعلى الصفحة
    window.scrollTo(0, 0);

    // تشغيل أغنية عيد الميلاد
    birthdayMusic.currentTime = 0;

    birthdayMusic.play()
        .then(function () {
            musicBtn.textContent = "🔊";
        })
        .catch(function (error) {
            console.log("Birthday music error:", error);
        });

    // تشغيل الكتابة بعد فتح الموقع
    setTimeout(typeMessage, 800);
};


/* ================= MUSIC BUTTON ================= */

musicBtn.onclick = function () {

    if (birthdayMusic.paused) {

        birthdayMusic.play()
            .then(function () {
                musicBtn.textContent = "🔊";
            })
            .catch(function (error) {
                console.log("Music error:", error);
            });

    } else {

        birthdayMusic.pause();
        musicBtn.textContent = "🔇";
    }
};


/* ================= TYPEWRITER MESSAGE ================= */

let typingText = document.getElementById("typing-text");
let moreBtn = document.getElementById("moreBtn");

let message =
    "There was a time when you were my favorite… " +
    "and I’ll always cherish that time. ❤️";

let messageIndex = 0;
let typingStarted = false;

function typeMessage() {

    if (typingStarted) return;

    typingStarted = true;
    typingText.textContent = "";
    messageIndex = 0;

    let typing = setInterval(function () {

        typingText.textContent += message[messageIndex];

        messageIndex++;

        if (messageIndex >= message.length) {
            clearInterval(typing);
        }

    }, 45);
}


/* ================= THERE'S MORE BUTTON ================= */

if (moreBtn) {

    moreBtn.onclick = function () {

        document.getElementById("openWhen").scrollIntoView({
            behavior: "smooth"
        });

    };
}


/* ================= OPEN WHEN CARDS ================= */

let openCards = document.querySelectorAll(".open-card");
let openWhenMessage = document.getElementById("openWhenMessage");
let openWhenText = document.getElementById("openWhenText");
let openWhenIcon = document.getElementById("openWhenIcon");
let closeOpenMessage = document.querySelector(".close-open-message");

openCards.forEach(function (card) {

    card.onclick = function () {

        let messageText = card.getAttribute("data-message");
        let icon = card.querySelector(".open-card-icon");

        openWhenText.textContent = messageText;

        if (icon) {
            openWhenIcon.textContent = icon.textContent;
        }

        openWhenMessage.classList.add("show");

    };

});


if (closeOpenMessage) {

    closeOpenMessage.onclick = function () {

        openWhenMessage.classList.remove("show");

    };

}


/* ================= SURPRISE GIFT ================= */

let giftBtn = document.getElementById("giftBtn");
let finalMessage = document.getElementById("finalMessage");

if (giftBtn) {

    giftBtn.onclick = function () {

        giftBtn.style.display = "none";

        finalMessage.style.display = "block";

    };

}


/* ================= IMAGE MODAL ================= */

let memoryImages = document.querySelectorAll(".memory img");
let imageModal = document.getElementById("imageModal");
let modalImage = document.getElementById("modalImage");
let closeModal = document.querySelector(".close-modal");

memoryImages.forEach(function (image) {

    image.onclick = function () {

        modalImage.src = image.src;

        imageModal.classList.add("show");

    };

});


if (closeModal) {

    closeModal.onclick = function () {

        imageModal.classList.remove("show");

    };

}


if (imageModal) {

    imageModal.onclick = function (event) {

        if (event.target === imageModal) {
            imageModal.classList.remove("show");
        }

    };

}


/* ================= COUNTDOWN ================= */

/*
    للتجربة:
    خلي التاريخ قديم، مثل September 1, 2026

    بعد ما تخلص التجربة:
    رجعه إلى September 26, 2026
*/

const birthdayDate =
    new Date("September 1, 2026 00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = birthdayDate - now;


    // ================= التاريخ انتهى =================

    if (distance <= 0) {

        // إخفاء العداد
        let countdown = document.getElementById("countdown");

        if (countdown) {
            countdown.style.display = "none";
        }

        // تشغيل مستويات السر
        startSecretLevels();

        return;
    }


    // ================= حساب الوقت =================

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    // ================= عرض الوقت =================

    let daysElement = document.getElementById("days");
    let hoursElement = document.getElementById("hours");
    let minutesElement = document.getElementById("minutes");
    let secondsElement = document.getElementById("seconds");


    if (daysElement) {
        daysElement.textContent = days;
    }

    if (hoursElement) {
        hoursElement.textContent = hours;
    }

    if (minutesElement) {
        minutesElement.textContent = minutes;
    }

    if (secondsElement) {
        secondsElement.textContent = seconds;
    }

}


/* ================= START SECRET LEVELS ================= */

function startSecretLevels() {

    let lockedCard = document.getElementById("lockedCard");
    let level1 = document.getElementById("level1");

    if (lockedCard) {
        lockedCard.style.display = "none";
    }

    if (level1) {
        level1.style.display = "block";
    }

}


/* تشغيل العداد أول مرة */
updateCountdown();


/* تحديث العداد كل ثانية */
setInterval(updateCountdown, 1000);


/* ================= LEVEL 01 ================= */

let level1Btn = document.getElementById("level1Btn");
let level1Input = document.getElementById("level1Input");
let level1Error = document.getElementById("level1Error");

if (level1Btn) {

    level1Btn.onclick = function () {

        let answer = level1Input.value
            .trim()
            .toLowerCase();

        /* اول اجابه وليها احتمالين*/ 
        if (
            answer === "0000" ||
            answer === "0000"
        ) {

            // إخفاء Level 01
            document.getElementById("level1").style.display = "none";

            // إظهار Level 02
            document.getElementById("level2").style.display = "block";

            level1Error.textContent = "";

        } else {

            level1Error.textContent =
                "Not quite... try again ❤️";

        }

    };

}


/* ================= LEVEL 02 ================= */

let level2Btn = document.getElementById("level2Btn");
let level2Input = document.getElementById("level2Input");
let level2Error = document.getElementById("level2Error");

if (level2Btn) {

    level2Btn.onclick = function () {

        let code = level2Input.value
            .trim()
            .toLowerCase();

        /* تاني اجابه*/
        if (code === "0000") {

            // إخفاء Level 02
            document.getElementById("level2").style.display = "none";

            // إظهار Level 03
            document.getElementById("level3").style.display = "block";

            level2Error.textContent = "";

        } else {

            level2Error.textContent =
                "Look a little closer... 🔎";

        }

    };

}


/* ================= LEVEL 03 ================= */

let level3Btn = document.getElementById("level3Btn");
let level3Input = document.getElementById("level3Input");
let level3Error = document.getElementById("level3Error");

if (level3Btn) {

    level3Btn.onclick = function () {

        let password = level3Input.value.trim();

        /*تالت اجابه */
        if (password === "0000") {

            // إخفاء Level 03
            document.getElementById("level3").style.display = "none";

            // إظهار الرسالة السرية
            revealSecret();

            level3Error.textContent = "";

        } else {

            level3Error.textContent =
                "That's not the final answer... ❤️";

        }

    };

}


/* ================= SECRET REVEAL ================= */

function revealSecret() {

    // إيقاف أغنية عيد الميلاد
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0;


    // تشغيل الأغنية السرية
    secretMusic.currentTime = 0;

    secretMusic.volume = 1;

    secretMusic.play()
        .then(function () {
            console.log("Secret music started");
        })
        .catch(function (error) {
            console.log("Secret music error:", error);
        });


    // إظهار شاشة السر
    let secretReveal =
        document.getElementById("secretReveal");


    if (secretReveal) {

        secretReveal.classList.add("night");

        secretReveal.style.display = "flex";

        setTimeout(function () {

            secretReveal.classList.add("show");

        }, 100);

    }

}


/* ================= ONE LAST THING ================= */

let lastThingBtn =
    document.getElementById("lastThingBtn");

let oneLastThing =
    document.getElementById("oneLastThing");

let finalImage =
    document.getElementById("finalImage");


if (lastThingBtn) {

    lastThingBtn.onclick = function () {

        // تهدئة الموسيقى
        fadeMusic();


        // إخفاء زر الموسيقى
        musicBtn.style.display = "none";


        // إظهار آخر جزء
        oneLastThing.style.display = "flex";


        // النزول للجزء الأخير
        setTimeout(function () {

            oneLastThing.scrollIntoView({
                behavior: "smooth"
            });

        }, 100);


        // إظهار الصورة بعد شوية
        setTimeout(function () {

            if (finalImage) {
                finalImage.classList.add("show");
            }

        }, 2500);

    };

}


/* ================= FADE SECRET MUSIC ================= */

function fadeMusic() {

    let volume = secretMusic.volume;


    let fade = setInterval(function () {

        volume -= 0.05;


        if (volume <= 0) {

            volume = 0;

            secretMusic.volume = 0;

            secretMusic.pause();

            clearInterval(fade);

        } else {

            secretMusic.volume = volume;

        }

    }, 150);

}