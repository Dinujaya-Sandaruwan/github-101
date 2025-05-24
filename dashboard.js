// Dashboard JavaScript

// DOM Elements
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");
const toggleBtn = document.getElementById("toggleBtn");
const navLinks = document.querySelectorAll(".nav-link");
const contentSections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const searchInput = document.getElementById("searchInput");

// Sample data
const sampleApplications = [
  {
    name: "Alice Johnson",
    department: "Software Dev",
    status: "approved",
    date: "2025-05-20",
  },
  {
    name: "Bob Smith",
    department: "Marketing",
    status: "pending",
    date: "2025-05-19",
  },
  {
    name: "Carol Davis",
    department: "Design",
    status: "approved",
    date: "2025-05-18",
  },
  {
    name: "David Wilson",
    department: "Finance",
    status: "rejected",
    date: "2025-05-17",
  },
  {
    name: "Eva Brown",
    department: "HR",
    status: "pending",
    date: "2025-05-16",
  },
];

const sampleActivities = [
  {
    icon: "fas fa-user-plus",
    iconColor: "#3498db",
    title: "New intern application",
    description: "Alice Johnson applied for Software Development internship",
    time: "2 hours ago",
  },
  {
    icon: "fas fa-check-circle",
    iconColor: "#27ae60",
    title: "Application approved",
    description: "Bob Smith's application has been approved for Marketing",
    time: "4 hours ago",
  },
  {
    icon: "fas fa-file-alt",
    iconColor: "#f39c12",
    title: "Report generated",
    description: "Monthly internship report has been generated",
    time: "1 day ago",
  },
  {
    icon: "fas fa-users",
    iconColor: "#9b59b6",
    title: "Department meeting",
    description: "HR department meeting scheduled for tomorrow",
    time: "2 days ago",
  },
  {
    icon: "fas fa-graduation-cap",
    iconColor: "#e74c3c",
    title: "Internship completed",
    description: "John Doe completed his 6-month internship",
    time: "3 days ago",
  },
];

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", function () {
  initializeSidebar();
  initializeNavigation();
  initializeChart();
  loadApplicationsTable();
  loadActivityFeed();
  initializeSearch();
  updateStats();

  // Add some interactive animations
  addHoverEffects();
});

// Sidebar functionality
function initializeSidebar() {
  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");

    // Save sidebar state
    const isCollapsed = sidebar.classList.contains("collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  });

  // Restore sidebar state
  const savedState = localStorage.getItem("sidebarCollapsed");
  if (savedState === "true") {
    sidebar.classList.add("collapsed");
    mainContent.classList.add("expanded");
  }
}

// Navigation functionality
function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Get target section
      const targetSection = this.getAttribute("data-section");

      // Hide all sections
      contentSections.forEach((section) => section.classList.remove("active"));

      // Show target section
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add("active");
        updatePageHeader(targetSection);
      }
    });
  });
}

// Update page header based on current section
function updatePageHeader(section) {
  const headers = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Welcome back! Here's what's happening with your internships.",
    },
    interns: {
      title: "Manage Interns",
      subtitle: "View and manage all current interns in the system.",
    },
    applications: {
      title: "Applications",
      subtitle: "Review and process internship applications.",
    },
    departments: {
      title: "Departments",
      subtitle: "Manage departments and their internship programs.",
    },
    reports: {
      title: "Reports",
      subtitle: "Generate and view detailed reports and analytics.",
    },
    settings: {
      title: "Settings",
      subtitle: "Configure system settings and preferences.",
    },
  };

  if (headers[section]) {
    pageTitle.textContent = headers[section].title;
    pageSubtitle.textContent = headers[section].subtitle;
  }
}

// Initialize Chart
function initializeChart() {
  const ctx = document.getElementById("applicationChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Applications",
          data: [12, 19, 15, 25, 22, 30],
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3498db",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 10,
        },
        {
          label: "Completed",
          data: [8, 12, 10, 18, 15, 20],
          borderColor: "#27ae60",
          backgroundColor: "rgba(39, 174, 96, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#27ae60",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: "600",
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#7f8c8d",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#7f8c8d",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      elements: {
        point: {
          hoverRadius: 8,
        },
      },
    },
  });
}

// Load applications table
function loadApplicationsTable() {
  const tbody = document.querySelector("#applicationsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  sampleApplications.forEach((app) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #3498db, #2980b9); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.8rem;">
                        ${app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </div>
                    <span style="font-weight: 600;">${app.name}</span>
                </div>
            </td>
            <td>${app.department}</td>
            <td><span class="status-badge ${app.status}">${
      app.status
    }</span></td>
            <td>${formatDate(app.date)}</td>
        `;

    // Add hover effect
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8f9fa";
    });

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    tbody.appendChild(row);
  });
}

// Load activity feed
function loadActivityFeed() {
  const activityFeed = document.getElementById("activityFeed");
  if (!activityFeed) return;

  activityFeed.innerHTML = "";

  sampleActivities.forEach((activity) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";
    activityItem.innerHTML = `
            <div class="activity-icon" style="background-color: ${activity.iconColor};">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;

    activityFeed.appendChild(activityItem);
  });
}

// Initialize search functionality
function initializeSearch() {
  let searchTimeout;

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = this.value.toLowerCase().trim();

      if (searchTerm === "") {
        loadApplicationsTable();
        return;
      }

      // Filter applications based on search term
      const filteredApplications = sampleApplications.filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm) ||
          app.department.toLowerCase().includes(searchTerm) ||
          app.status.toLowerCase().includes(searchTerm)
      );

      // Update table with filtered results
      updateApplicationsTable(filteredApplications);
    }, 300);
  });
}

// Update applications table with filtered data
function updateApplicationsTable(applications) {
  const tbody = document.querySelector("#applicationsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (applications.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td colspan="4" style="text-align: center; padding: 30px; color: #7f8c8d;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                No results found
            </td>
        `;
    tbody.appendChild(row);
    return;
  }

  applications.forEach((app) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #3498db, #2980b9); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.8rem;">
                        ${app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </div>
                    <span style="font-weight: 600;">${app.name}</span>
                </div>
            </td>
            <td>${app.department}</td>
            <td><span class="status-badge ${app.status}">${
      app.status
    }</span></td>
            <td>${formatDate(app.date)}</td>
        `;

    // Add hover effect
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8f9fa";
    });

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });

    tbody.appendChild(row);
  });
}

// Update stats with animation
function updateStats() {
  const stats = [
    { id: "totalInterns", value: 24, duration: 2000 },
    { id: "activeApplications", value: 18, duration: 1800 },
    { id: "departments", value: 6, duration: 1000 },
    { id: "completedInternships", value: 12, duration: 1500 },
  ];

  stats.forEach((stat) => {
    const element = document.getElementById(stat.id);
    if (element) {
      animateCounter(element, 0, stat.value, stat.duration);
    }
  });
}

// Animate counter numbers
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOutCubic);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = end;
    }
  }

  requestAnimationFrame(updateCounter);
}

// Add hover effects to interactive elements
function addHoverEffects() {
  // Stat cards hover effect
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Dashboard cards hover effect
  const dashboardCards = document.querySelectorAll(".dashboard-card");
  dashboardCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
    });
  });
}

// Utility function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Notification functionality
document
  .querySelector(".notification-btn")
  .addEventListener("click", function () {
    // Simple notification dropdown simulation
    alert(
      "You have 3 new notifications:\n• New application from Alice Johnson\n• Meeting reminder: HR Department\n• Report ready for download"
    );
  });

// User profile menu functionality
document.querySelector(".user-profile").addEventListener("click", function () {
  // Simple profile menu simulation
  const choice = confirm(
    "User Profile Menu:\n\nPress OK for Profile Settings\nPress Cancel for Logout"
  );
  if (choice) {
    alert("Profile settings would open here");
  } else {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logout functionality would be implemented here");
    }
  }
});

// Responsive sidebar for mobile
function handleMobileMenu() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("mobile");

    // Add overlay for mobile sidebar
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        `;
    document.body.appendChild(overlay);

    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      overlay.style.display = sidebar.classList.contains("show")
        ? "block"
        : "none";
    });

    overlay.addEventListener("click", function () {
      sidebar.classList.remove("show");
      this.style.display = "none";
    });
  }
}

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("show", "mobile");
    const overlay = document.querySelector(".sidebar-overlay");
    if (overlay) {
      overlay.remove();
    }
  } else {
    handleMobileMenu();
  }
});

// Initialize mobile menu on load
handleMobileMenu();

// Simulate real-time updates
setInterval(function () {
  // Update notification badge randomly
  const badge = document.querySelector(".notification-badge");
  const currentCount = parseInt(badge.textContent);
  const shouldUpdate = Math.random() > 0.95; // 5% chance every interval

  if (shouldUpdate && currentCount < 10) {
    badge.textContent = currentCount + 1;

    // Add pulse animation
    badge.style.animation = "none";
    setTimeout(() => {
      badge.style.animation = "pulse 1s ease-in-out";
    }, 10);
  }
}, 5000);

// Add pulse animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

console.log("Dashboard initialized successfully!");
