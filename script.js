/* =========================================
   متجر نجوم النشاط ⭐
   script.js
========================================= */


/* =========================================
   المتغيرات الأساسية
========================================= */

let studentName = "";
let studentClass = "";

let selectedGift = "";
let selectedGiftIcon = "";


// بيانات تجريبية مؤقتة للوحة المشرفة
// لاحقًا سنستبدلها بقاعدة البيانات الحقيقية
let choices = JSON.parse(localStorage.getItem("nojoomChoices")) || [];


/* =========================================
   عناصر الصفحات
========================================= */

const pages = document.querySelectorAll(".page");

const welcomePage = document.getElementById("welcomePage");
const studentPage = document.getElementById("studentPage");
const storePage = document.getElementById("storePage");
const celebrationPage = document.getElementById("celebrationPage");
const alreadyChosenPage = document.getElementById("alreadyChosenPage");

const adminLoginPage =
    document.getElementById("adminLoginPage");

const adminDashboardPage =
    document.getElementById("adminDashboardPage");


/* =========================================
   دالة التنقل بين الصفحات
========================================= */

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   زر البداية
========================================= */


const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

   
 // هل سبق الاختيار من هذا الجهاز؟
    /*
    const previousChoice =
        localStorage.getItem("studentGiftChoice");

    if (previousChoice) {

        const data = JSON.parse(previousChoice);

        document.getElementById("previousGiftName")
            .textContent = data.gift;

        document.getElementById("previousGiftIcon")
            .textContent = data.icon;

        showPage("alreadyChosenPage");

        return;
    }
*/
    showPage("studentPage");

});


/* =========================================
   أزرار الرجوع
========================================= */

const backButtons =
    document.querySelectorAll(".back-btn");

backButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetPage =
            button.dataset.page;

        showPage(targetPage);

    });

});


/* =========================================
   بيانات الطالبة
========================================= */

const studentNameInput =
    document.getElementById("studentName");

const studentClassInput =
    document.getElementById("studentClass");

const studentError =
    document.getElementById("studentError");

const goToStoreBtn =
    document.getElementById("goToStoreBtn");


goToStoreBtn.addEventListener("click", () => {

    const name =
        studentNameInput.value.trim();

    const className =
        studentClassInput.value.trim();


    if (name === "" || className === "") {

        studentError.textContent =
            "اكتبي اسمك والفصل أولًا 💗";

        return;
    }


    if (name.length < 3) {

        studentError.textContent =
            "اكتبي اسمك بشكل كامل ✨";

        return;
    }


    studentError.textContent = "";

    studentName = name;
    studentClass = className;


    document.getElementById("displayStudentName")
        .textContent = studentName;


    showPage("storePage");

});


/* =========================================
   اختيار الهدية
========================================= */

const giftCards =
    document.querySelectorAll(".gift-card");

const confirmModal =
    document.getElementById("confirmModal");

const confirmGiftName =
    document.getElementById("confirmGiftName");

const confirmGiftIcon =
    document.getElementById("confirmGiftIcon");


giftCards.forEach(card => {

    const button =
        card.querySelector(".choose-gift-btn");

    button.addEventListener("click", () => {

        selectedGift =
            card.dataset.gift;

        selectedGiftIcon =
            card.dataset.icon;


        confirmGiftName.textContent =
            selectedGift;

        confirmGiftIcon.textContent =
            selectedGiftIcon;


        confirmModal.classList.add("show");

    });

});


/* =========================================
   إلغاء اختيار الهدية
========================================= */

const cancelGiftBtn =
    document.getElementById("cancelGiftBtn");

cancelGiftBtn.addEventListener("click", () => {

    confirmModal.classList.remove("show");

});


/* إغلاق النافذة عند الضغط خارجها */

confirmModal.addEventListener("click", event => {

    if (event.target === confirmModal) {

        confirmModal.classList.remove("show");

    }

});


/* =========================================
   تأكيد الهدية
========================================= */

const confirmGiftBtn =
    document.getElementById("confirmGiftBtn");


confirmGiftBtn.addEventListener("click", () => {

    if (!selectedGift) {
        return;
    }


    confirmModal.classList.remove("show");


    /* -----------------------------------------
       حفظ اختيار الطالبة على جهازها
    ----------------------------------------- */

    const studentChoice = {

        name: studentName,

        className: studentClass,

        gift: selectedGift,

        icon: selectedGiftIcon,

        date: new Date().toLocaleString("ar-SA")

    };


    localStorage.setItem(
        "studentGiftChoice",
        JSON.stringify(studentChoice)
    );


    /* -----------------------------------------
       حفظه في سجل الاختيارات المؤقت
    ----------------------------------------- */

    choices.push(studentChoice);

    localStorage.setItem(
        "nojoomChoices",
        JSON.stringify(choices)
    );


    /* -----------------------------------------
       تجهيز شاشة مبروك
    ----------------------------------------- */

    document.getElementById(
        "celebrationGiftName"
    ).textContent = selectedGift;


    document.getElementById(
        "celebrationGiftIcon"
    ).textContent = selectedGiftIcon;


    document.getElementById(
        "celebrationStudentName"
    ).textContent = studentName;


    document.getElementById(
        "celebrationStudentClass"
    ).textContent =
        "الفصل: " + studentClass;


    showPage("celebrationPage");


    /* تشغيل المفرقعات */

    createConfetti();

});


/* =========================================
   المفرقعات الورقية 🎉
========================================= */

function createConfetti() {

    const container =
        document.getElementById("confettiContainer");


    container.innerHTML = "";


    const colors = [

        "#ff6fa5",
        "#ffc857",
        "#9d7bea",
        "#65c9c2",
        "#ff9f68",
        "#7aa7ff",
        "#f48fb1"

    ];


    // عدد القصاصات

    const numberOfConfetti = 120;


    for (
        let i = 0;
        i < numberOfConfetti;
        i++
    ) {

        const confetti =
            document.createElement("span");


        confetti.classList.add("confetti");


        /* مكان عشوائي */

        confetti.style.left =
            Math.random() * 100 + "%";


        /* لون عشوائي */

        confetti.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        /* حجم عشوائي */

        const width =
            Math.random() * 7 + 6;

        const height =
            Math.random() * 10 + 8;


        confetti.style.width =
            width + "px";

        confetti.style.height =
            height + "px";


        /* تأخير عشوائي */

        confetti.style.animationDelay =
            Math.random() * 1.2 + "s";


        /* سرعة عشوائية */

        confetti.style.animationDuration =
            Math.random() * 2 + 2.5 + "s";


        /* تدوير */

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        container.appendChild(confetti);

    }


    /* تنظيف المفرقعات بعد انتهاء الحركة */

    setTimeout(() => {

        container.innerHTML = "";

    }, 6000);

}


/* =========================================
   زر إنهاء
========================================= */

const finishBtn =
    document.getElementById("finishBtn");


finishBtn.addEventListener("click", () => {

    showPreviousChoice();

});


/* =========================================
   عرض الهدية السابقة
========================================= */

function showPreviousChoice() {

    const previousChoice =
        localStorage.getItem("studentGiftChoice");


    if (!previousChoice) {

        showPage("welcomePage");

        return;
    }


    const data =
        JSON.parse(previousChoice);


    document.getElementById(
        "previousGiftName"
    ).textContent = data.gift;


    document.getElementById(
        "previousGiftIcon"
    ).textContent = data.icon;


    showPage("alreadyChosenPage");

}


/* =========================================
   دخول المشرفة
========================================= */

const openAdminLogin =
    document.getElementById("openAdminLogin");


openAdminLogin.addEventListener("click", () => {

    showPage("adminLoginPage");

});


/* =========================================
   بيانات دخول المشرفة
   مؤقتة فقط أثناء بناء المشروع
========================================= */

const TEMP_ADMIN_USERNAME = "admin";
const TEMP_ADMIN_PASSWORD = "1234";


const adminLoginBtn =
    document.getElementById("adminLoginBtn");

const adminLoginError =
    document.getElementById("adminLoginError");


adminLoginBtn.addEventListener("click", () => {

    const username =
        document.getElementById(
            "adminUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "adminPassword"
        ).value.trim();


    if (
        username === TEMP_ADMIN_USERNAME &&
        password === TEMP_ADMIN_PASSWORD
    ) {

        adminLoginError.textContent = "";

        loadDashboard();

        showPage("adminDashboardPage");

    }

    else {

        adminLoginError.textContent =
            "اسم المستخدم أو كلمة المرور غير صحيحة";

    }

});


/* =========================================
   تسجيل خروج المشرفة
========================================= */

const adminLogoutBtn =
    document.getElementById("adminLogoutBtn");


adminLogoutBtn.addEventListener("click", () => {

    document.getElementById(
        "adminPassword"
    ).value = "";

    showPage("welcomePage");

});


/* =========================================
   لوحة المشرفة
========================================= */

function loadDashboard() {

    choices =
        JSON.parse(
            localStorage.getItem("nojoomChoices")
        ) || [];


    updateStatistics();

    updateClassFilter();

    renderChoices(choices);

}


/* =========================================
   الإحصائيات
========================================= */

function updateStatistics() {

    const totalChoices =
        choices.length;


    /*
       نحسب الطالبات حسب:
       الاسم + الفصل
    */

    const uniqueStudents =
        new Set();


    choices.forEach(choice => {

        const key =
            normalizeText(choice.name) +
            "|" +
            normalizeText(choice.className);

        uniqueStudents.add(key);

    });


    const duplicateCount =
        totalChoices -
        uniqueStudents.size;


    document.getElementById(
        "totalChoices"
    ).textContent = totalChoices;


    document.getElementById(
        "totalStudents"
    ).textContent =
        uniqueStudents.size;


    document.getElementById(
        "duplicateCount"
    ).textContent =
        duplicateCount;

}


/* =========================================
   تنظيف النص للمقارنة
========================================= */

function normalizeText(text) {

    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}


/* =========================================
   معرفة الاختيارات المكررة
========================================= */

function getStudentChoiceCount(
    name,
    className
) {

    const target =
        normalizeText(name) +
        "|" +
        normalizeText(className);


    return choices.filter(choice => {

        const current =
            normalizeText(choice.name) +
            "|" +
            normalizeText(choice.className);

        return current === target;

    }).length;

}


/* =========================================
   عرض الجدول
========================================= */

function renderChoices(data) {

    const tableBody =
        document.getElementById(
            "choicesTableBody"
        );


    const emptyDashboard =
        document.getElementById(
            "emptyDashboard"
        );


    tableBody.innerHTML = "";


    if (data.length === 0) {

        emptyDashboard.style.display =
            "block";

        return;

    }


    emptyDashboard.style.display =
        "none";


    data.forEach((choice, index) => {

        const row =
            document.createElement("tr");


        const count =
            getStudentChoiceCount(
                choice.name,
                choice.className
            );


        let status = "✅ اختيار واحد";


        if (count > 1) {

            status =
                `⚠️ مكرر (${count})`;

            row.classList.add(
                "duplicate-row"
            );

        }


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${escapeHTML(choice.name)}
            </td>

            <td>
                ${escapeHTML(choice.className)}
            </td>

            <td>
                ${choice.icon}
                ${escapeHTML(choice.gift)}
            </td>

            <td>
                ${status}
            </td>

            <td>
                ${escapeHTML(choice.date)}
            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   حماية بسيطة عند عرض النص
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   قائمة الفصول
========================================= */

function updateClassFilter() {

    const classFilter =
        document.getElementById(
            "classFilter"
        );


    const currentValue =
        classFilter.value;


    const classes =
        [
            ...new Set(
                choices.map(
                    choice =>
                        choice.className
                )
            )
        ];


    classFilter.innerHTML = `

        <option value="">
            جميع الفصول
        </option>

    `;


    classes.forEach(className => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            className;

        option.textContent =
            className;


        classFilter.appendChild(
            option
        );

    });


    classFilter.value =
        currentValue;

}


/* =========================================
   البحث والتصفية
========================================= */

const studentSearch =
    document.getElementById(
        "studentSearch"
    );


const classFilter =
    document.getElementById(
        "classFilter"
    );


studentSearch.addEventListener(
    "input",
    filterDashboard
);


classFilter.addEventListener(
    "change",
    filterDashboard
);


function filterDashboard() {

    const searchText =
        normalizeText(
            studentSearch.value
        );


    const selectedClass =
        classFilter.value;


    const filtered =
        choices.filter(choice => {

            const matchesName =
                normalizeText(
                    choice.name
                ).includes(searchText);


            const matchesClass =
                selectedClass === "" ||
                choice.className ===
                selectedClass;


            return (
                matchesName &&
                matchesClass
            );

        });


    renderChoices(filtered);

}


/* =========================================
   عند فتح الموقع
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showPage("welcomePage");

    }
);
/* =========================================
   بدء مسابقة جديدة
========================================= */

const newCompetitionBtn =
    document.getElementById("newCompetitionBtn");

newCompetitionBtn.addEventListener("click", () => {

    const confirmed = confirm(
        "هل أنتِ متأكدة من بدء مسابقة جديدة؟\nسيتم تصفير نتائج المسابقة الحالية."
    );

    if (!confirmed) {
        return;
    }

    // حذف نتائج المسابقة الحالية
    localStorage.removeItem("nojoomChoices");

    // السماح بالاختيار من جديد
    localStorage.removeItem("studentGiftChoice");

    // تصفير المصفوفة الموجودة في الصفحة
    choices = [];

    // تحديث لوحة المشرفة
    loadDashboard();

});