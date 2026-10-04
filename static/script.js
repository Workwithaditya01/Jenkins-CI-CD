document.addEventListener("DOMContentLoaded", () => {

    const nodes = document.querySelectorAll(".pipeline-node");

    nodes.forEach((node, index) => {
        node.style.opacity = "0";
        node.style.transform = "translateY(15px)";

        setTimeout(() => {
            node.style.transition = "all 0.6s ease";
            node.style.opacity = "1";
            node.style.transform = "translateY(0)";
        }, 400 + (index * 250));
    });

});
