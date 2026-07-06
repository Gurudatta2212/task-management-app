import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function exportTasksPdf(tasks) {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const doc = new jsPDF("p", "mm", "a4");

  // -----------------------------
  // Analytics
  // -----------------------------

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriority = tasks.filter(
    (task) =>
      task.priority === "High" &&
      task.status !== "Completed"
  ).length;

  const overdue = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "Completed" &&
      new Date(task.dueDate) < new Date()
  ).length;

  const dueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate).toDateString() ===
      new Date().toDateString()
    );
  }).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  const generatedDate =
    new Date().toLocaleString();
    

  // -----------------------------
  // Header
  // -----------------------------

  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("TASK MANAGER", 15, 12);

  doc.setFontSize(10);

  doc.setFont("helvetica", "normal");

  doc.text(
    "Productivity Dashboard",
    15,
    19
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text(
    user.name || "User",
    195,
    12,
    {
      align: "right",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    user.email || "",
    195,
    19,
    {
      align: "right",
    }
  );

// -----------------------------
// Report Title
// -----------------------------

doc.setTextColor(40);

doc.setFont("helvetica", "bold");
doc.setFontSize(22);

doc.text(
  "TASK MANAGEMENT REPORT",
  105,
  42,
  { align: "center" }
);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);

doc.text(
  `Generated : ${generatedDate}`,
  105,
  50,
  { align: "center" }
);

doc.setDrawColor(220);
doc.line(15, 55, 195, 55);

// -----------------------------
// Summary
// -----------------------------

doc.setFont("helvetica", "bold");
doc.setFontSize(15);

doc.text("SUMMARY", 15, 62);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);

doc.text(`Total Tasks : ${tasks.length}`, 20, 72);
doc.text(`Completed : ${completed}`, 20, 82);
doc.text(`Pending : ${pending}`, 20, 92);
doc.text(`Completion Rate : ${completionRate}%`, 20, 102);

doc.text(`High Priority : ${highPriority}`, 110, 72);
doc.text(`Overdue Tasks : ${overdue}`, 110, 82);
doc.text(`Due Today : ${dueToday}`, 110, 92);

  // ===== PART 2 CONTINUES FROM HERE =====
    // -----------------------------
  // Task Details
  // -----------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  // Divider after Summary
doc.setDrawColor(200);
doc.line(15, 108, 195, 108);

// Task Details
doc.setFont("helvetica", "bold");
doc.setFontSize(15);

doc.text("TASK DETAILS", 15, 118);

autoTable(doc, {
  startY: 124,

    head: [
      [
        "Title",
        "Priority",
        "Status",
        "Due Date",
        "Created",
      ],
    ],

    body: tasks.map((task) => [
      task.title,

      task.priority?.toUpperCase() || "-",

      task.status?.toUpperCase() || "-",

      task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "-",

      task.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : "-",
    ]),

    headStyles: {
  fillColor: [79, 70, 229],
  textColor: [255, 255, 255],
  halign: "center",
  fontStyle: "bold",
  fontSize: 11,
},

    bodyStyles: {
      fontSize: 10,
      valign: "middle",
    },

    alternateRowStyles: {
  fillColor: [248, 250, 252],
},

    styles: {
  cellPadding: 4,
  lineColor: [225, 225, 225],
  lineWidth: 0.2,
  fontSize: 10,
},

    margin: {
      left: 15,
      right: 15,
    },
  });

  // -----------------------------
  // Upcoming Deadlines
  // -----------------------------

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        task.status !== "Completed" &&
        new Date(task.dueDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  let finalY = doc.lastAutoTable.finalY + 12;

// Divider
doc.setDrawColor(200);
doc.line(15, finalY + 2, 195, finalY + 2);

finalY += 10;

  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text(
    "UPCOMING DEADLINES",
    15,
    finalY
  );

  finalY += 12;

  if (upcomingTasks.length === 0) {
    doc.setFont("helvetica", "normal");

    doc.text(
      "No upcoming deadlines.",
      20,
      finalY
    );
  } else {
    upcomingTasks.forEach((task) => {
      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.text(
  `• ${task.title.substring(0, 35)}`,
  20,
  finalY
);

      doc.text(
  new Date(task.dueDate).toLocaleDateString(),
  195,
  finalY,
  { align: "right" }
);

      finalY += 8;
    });
  }

  // ===== PART 3 CONTINUES FROM HERE =====
    // -----------------------------
  // Footer
  // -----------------------------

  const pageHeight = doc.internal.pageSize.getHeight();
const pageWidth = doc.internal.pageSize.getWidth();

doc.setDrawColor(220);
doc.line(
  15,
  pageHeight - 20,
  pageWidth - 15,
  pageHeight - 18
);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(130);

doc.text(
  "© 2026 Task Manager. All Rights Reserved.",
  pageWidth / 2,
  pageHeight - 11,
  {
    align: "center",
  }
);

doc.save(
  `Task_Report_${new Date()
    .toISOString()
    .split("T")[0]}.pdf`
);
}

export default exportTasksPdf;
