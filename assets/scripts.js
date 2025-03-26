$(document).ready(function () {
    AOS.init();

    let isScrolling = false;
    const windowHeight = $(window).height();
    const navbarHeight = 72;
    const offsetMargin = 50;

    function highlightNav() {
        if (isScrolling) return;

        const scrollPos = $(window).scrollTop();

        $(".nav-link").each(function () {
            const section = $($(this).attr("href"));
            
            if (section.length) {
                const sectionTop = section.offset().top - navbarHeight - offsetMargin;
                const sectionBottom = sectionTop + section.outerHeight();

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $(".nav-link").removeClass("active");
                    $(this).addClass("active");
                }
            }
        });
    }

    function scrollToSection(target) {
        if (target.length) {
            isScrolling = true;

            const targetOffset = target.offset().top - navbarHeight;

            $("html, body").animate(
                { scrollTop: targetOffset },
                400,
                'swing',
                () => {
                    isScrolling = false;
                    requestAnimationFrame(highlightNav);
                }
            );
        }
    }

    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const target = $($(this).attr("href"));
        scrollToSection(target);
    });

    $(".btn-next").on("click", function (e) {
        e.preventDefault();
        const nextSection = $("#nosotros");
        scrollToSection(nextSection);
    });

    $(window).on("scroll", () => {
        requestAnimationFrame(highlightNav);
    });

    highlightNav();
});
