// Aarohan International Academy

document.addEventListener("DOMContentLoaded", function () {

    // Display current year in the footer
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Scroll reveal animation
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(function (item) {
            item.classList.add("visible");
        });

    }

    // Highlight active navigation link
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    function updateActiveLink() {

        let currentSection = "home";

        sections.forEach(function (section) {

            if (window.scrollY >= section.offsetTop - 150) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + currentSection
            );

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

    // Close mobile menu after clicking a navigation link
    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const navMenu = document.getElementById("mainNav");

            if (
                navMenu &&
                navMenu.classList.contains("show") &&
                window.bootstrap
            ) {
                bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
            }

        });

    });

    // Back to top button
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 450) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    // Enquiry form validation
    const enquiryForm = document.getElementById("enquiryForm");
    const formMessage = document.getElementById("formMessage");

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const parentName = document.getElementById("parentName").value.trim();

        formMessage.textContent =
            "Thank you, " + parentName +
            "! This is a demo form. Your enquiry has not been sent.";

        formMessage.className = "form-message success";

        enquiryForm.reset();

    });

});