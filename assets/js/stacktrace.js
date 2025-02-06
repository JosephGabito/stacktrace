// Analysis tabs
document.addEventListener("DOMContentLoaded", function () {
    // Analysis tab switching
    document.querySelectorAll(".analysis-tab").forEach(tab => {
        tab.addEventListener("click", function () {
            // Update active states for tabs
            document.querySelectorAll(".analysis-tab").forEach(t =>
                t.classList.remove("active")
            );
            this.classList.add("active");

            // Show/hide content
            const tabId = this.getAttribute("data-tab");
            document.querySelectorAll(".analysis-tab-content").forEach(content =>
                content.classList.remove("active")
            );
            document.getElementById(tabId + "-tab").classList.add("active");
        });
    });
});

// Deep link to insights
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const insightId = urlParams.get("insight");
});

document.addEventListener("DOMContentLoaded", function () {
    // Handle deep linking to specific function calls
    if (window.location.hash && window.location.hash.startsWith("#trace-")) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            // Scroll to the element
            element.scrollIntoView({ behavior: "smooth" });

            // Expand the content
            const content = element.querySelector(".stacktrace-group-content");
            const toggle = element.querySelector(".stacktrace-toggle");
            if (content && toggle) {
                content.classList.remove("hidden");
                toggle.classList.remove("collapsed");
            }

            // Highlight briefly
            element.classList.add("highlight");
            setTimeout(() => element.classList.remove("highlight"), 2000);
        }
    }
});

// Stacktrace overlay
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector(".stacktrace-content-overlay");
    const tabs = document.querySelectorAll(".stacktrace-tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
            const activeContent = document.getElementById(tabId + "-tab");

            // If this tab is already active, hide everything
            if (this.classList.contains("active")) {
                overlay.classList.remove("visible");
                tabs.forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".stacktrace-tab-content").forEach(c => {
                    c.style.display = "none";
                });
                return;
            }

            // Otherwise, show this tab\'s content
            overlay.classList.add("visible");

            // Update active states
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".stacktrace-tab-content").forEach(c => {
                c.style.display = "none";
            });

            this.classList.add("active");
            if (activeContent) {
                activeContent.style.display = "block";
            }
        });
    });

    // Close button
    const closeButton = document.querySelector(".stacktrace-close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            overlay.classList.remove("visible");
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".stacktrace-tab-content").forEach(c => {
                c.style.display = "none";
            });
        });
    }

    // Close on escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            overlay.classList.remove("visible");
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".stacktrace-tab-content").forEach(c => {
                c.style.display = "none";
            });
        }
    });

    // Group toggle functionality
    document.querySelectorAll(".stacktrace-toggle").forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            this.classList.toggle("collapsed");
            const content = this.parentElement.querySelector(".stacktrace-group-content");
            if (content) {
                content.classList.toggle("hidden");
            }
        });
    });

    // Get filter controls
    const sortSelect = document.getElementById("stacktrace-sort");
    const filterInput = document.getElementById("stacktrace-filter");
    const typeSelect = document.getElementById("stacktrace-type");

    if (sortSelect && filterInput && typeSelect) {
        function sortGroups() {
            const groups = Array.from(document.querySelectorAll(".stacktrace-group"));
            const container = document.querySelector(".stacktrace-groups");

            groups.sort((a, b) => {
                const aData = a.dataset;
                const bData = b.dataset;

                switch (sortSelect.value) {
                    case "queries":
                        return parseInt(bData.queries) - parseInt(aData.queries);
                    case "time":
                        return parseFloat(bData.time) - parseFloat(aData.time);
                    case "avg":
                        return (parseFloat(bData.time) / parseInt(bData.queries)) -
                            (parseFloat(aData.time) / parseInt(aData.queries));
                    default:
                        return 0;
                }
            });

            groups.forEach(group => container.appendChild(group));
        }

        function filterGroups() {
            const searchTerm = filterInput.value.toLowerCase();
            const type = typeSelect.value;

            document.querySelectorAll(".stacktrace-group").forEach(group => {
                const name = group.dataset.name.toLowerCase();
                const groupType = group.dataset.type;
                const matchesSearch = searchTerm === "" || name.includes(searchTerm);
                const matchesType = type === "all" || groupType === type;

                group.style.display = matchesSearch && matchesType ? "block" : "none";
            });
        }

        // Initial sort
        sortGroups();

        // Add event listeners
        sortSelect.addEventListener("change", sortGroups);
        filterInput.addEventListener("input", filterGroups);
        typeSelect.addEventListener("change", filterGroups);
    }
});

// Trace links
document.addEventListener('DOMContentLoaded', function () {
    // Handle trace links
    document.querySelectorAll('.trace-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Switch to queries tab
            const queriesTab = document.querySelector('[data-tab=\"queries\"]');
            const queriesContent = document.getElementById('queries-tab');

            if (queriesTab && queriesContent) {
                // Switch tabs
                document.querySelectorAll('.stacktrace-tab').forEach(tab =>
                    tab.classList.remove('active')
                );
                document.querySelectorAll('.stacktrace-tab-content').forEach(content =>
                    content.style.display = 'none'
                );

                queriesTab.classList.add('active');
                queriesContent.style.display = 'block';

                // Find and expand the trace group
                const traceId = this.dataset.trace;
                const traceGroup = document.getElementById(traceId);
                if (traceGroup) {
                    // Collapse all other groups
                    document.querySelectorAll('.stacktrace-group-content').forEach(content => {
                        content.classList.add('hidden');
                        const toggle = content.previousElementSibling.querySelector('.stacktrace-toggle');
                        if (toggle) toggle.classList.add('collapsed');
                    });

                    // Expand this group
                    const content = traceGroup.querySelector('.stacktrace-group-content');
                    const toggle = traceGroup.querySelector('.stacktrace-toggle');
                    if (content && toggle) {
                        content.classList.remove('hidden');
                        toggle.classList.remove('collapsed');
                    }

                    // Scroll to it
                    setTimeout(() => {
                        traceGroup.scrollIntoView({ behavior: 'smooth' });
                        traceGroup.classList.add('highlight');
                        setTimeout(() => traceGroup.classList.remove('highlight'), 2000);
                    }, 100);
                }
            }
        });
    });
});

// Details toggle
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".details-toggle").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const target = this.dataset.target;
            const card = this.closest(".http-request-card");
            const content = card.querySelector(`.details-section.${target}`);

            if (!content) return;

            // Toggle current content
            content.classList.toggle("hidden");
            this.classList.toggle("active");

            // Update button text
            const action = content.classList.contains("hidden") ? "Show" : "Hide";
            const type = target.split("-").map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(" ");

            this.innerHTML = `
                        <i class="dashicons dashicons-${getIcon(target)}"></i>
                        ${action} ${type}
                    `;
        });
    });

    function getIcon(target) {
        switch (target) {
            case "stack-trace": return "editor-code";
            case "payload": return "upload";
            case "response": return "download";
            default: return "info";
        }
    }
});