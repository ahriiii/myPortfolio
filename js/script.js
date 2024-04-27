/* Type Animation */

var type = new Typed(".typing", {
    strings: ["", "Personal Assistant",
        "Data Entry Clerk",
        "Administrative Support",
        "Social Media Manager",
        "Virtual Assistant"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

/* Aside */

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++)
{
    const a = navList[i].querySelector("a");

    a.addEventListener("click", function () {

        removeBackSection();

        for (let j = 0; j < totalNavList; j++) {

            if (navList[j].querySelector("a").classList.contains("active")) {

                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        
        allSection[i].classList.remove("back-section");
        
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active")
        }
    }
}

document.querySelector(".p-contact").addEventListener("click", function () {

    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

document.querySelector(".hire-me").addEventListener("click", function () {

    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    for (let i = 0; i < totalSection; i++) {

        allSection[i].classList.toggle("open");
        
    }
}

// Email Handling

var emailSend = function() {
    (function () {
        emailjs.init("OYjXX0F6ivzWjpgTY");
    })(); 
    var params = {
        name: document.querySelector("#name").value,
        subject: document.querySelector("#subject").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value
    };
    
    var serviceID = "service_ib7ru8w";
    var templateID = "template_ndt3v9a";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            swal("Message Sent", "Please wait for reply 😊", "success");
        }).catch();
}

// See More

const card = document.querySelector("#serviceCard");

card.addEventListener("click", event => {
    const current = event.target,
        isReadMoreBtn = current.className.includes("read-more-btn");
    if (!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector(".read-more-text");

    currentText.classList.toggle("read-more-text--show");

    current.textContent = current.textContent.includes("Read More") ?
        "Read Less" : "Read More";
})

// back and push

let sections = Array.from(document.querySelectorAll('.section'));

function selectSection(id) {
    sections.forEach(s => {
        s.classList.toggle('selected', s.id === id);
    })
}

sections.forEach(s => {
    let id = s.id;

    s.addEventListener('click', e => {
        history.pushState({ id }, `Selected: ${id}`, `./selected = ${id}`)
        selectSection(id);
    })
})

window.addEventListener('popstate', e => {
    selectSection(e.state.id);
})

history.replaceState({ id: null }, 'Default State', './')