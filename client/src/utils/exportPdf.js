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

  doc.setTextColor(30);

  doc.setFontSize(22);

  doc.setFont("helvetica", "bold");

  doc.text(
    "TASK MANAGEMENT REPORT",
    105,
    42,
    {
      align: "center",
    }
  );

  doc.setFontSize(11);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Generated : ${generatedDate}`,
    105,
    50,
    {
      align: "center",
    }
  );

  // -----------------------------
  // Summary Heading
  // -----------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text("Summary", 15, 65);

  // -----------------------------
  // Summary Box
  // -----------------------------

  doc.setDrawColor(220);
  doc.roundedRect(
    15,
    70,
    180,
    52,
    4,
    4
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Total Tasks : ${tasks.length}`,
    22,
    82
  );

  doc.text(
    `Completed : ${completed}`,
    22,
    92
  );

  doc.text(
    `Pending : ${pending}`,
    22,
    102
  );

  doc.text(
    `Completion Rate : ${completionRate}%`,
    22,
    112
  );

  doc.text(
    `High Priority : ${highPriority}`,
    110,
    82
  );

  doc.text(
    `Overdue Tasks : ${overdue}`,
    110,
    92
  );

  doc.text(
    `Due Today : ${dueToday}`,
    110,
    102
  );

  // ===== PART 2 CONTINUES FROM HERE =====
    // -----------------------------
  // Task Details
  // -----------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text("Task Details", 15, 135);

  autoTable(doc, {
    startY: 142,

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

      task.priority,

      task.status,

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
    },

    bodyStyles: {
      fontSize: 10,
      valign: "middle",
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    styles: {
      cellPadding: 3,
      lineColor: [225, 225, 225],
      lineWidth: 0.2,
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

  let finalY = doc.lastAutoTable.finalY + 15;

  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text(
    "Upcoming Deadlines",
    15,
    finalY
  );

  finalY += 8;

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
        `• ${task.title}`,
        20,
        finalY
      );

      doc.text(
        new Date(
          task.dueDate
        ).toLocaleDateString(),
        170,
        finalY
      );

      finalY += 8;
    });
  }

  // ===== PART 3 CONTINUES FROM HERE =====
    // -----------------------------
  // Footer
  // -----------------------------

  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Footer line
    doc.setDrawColor(220);
    doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);

    // Left footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      "Generated by Task Manager",
      15,
      pageHeight - 12
    );

    // Center footer
    doc.text(
      "© Copyright 2026 Task Manager. All Rights Reserved.",
      pageWidth / 2,
      pageHeight - 12,
      {
        align: "center",
      }
    );

    // Right footer
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 15,
      pageHeight - 12,
      {
        align: "right",
      }
    );
  }

  // -----------------------------
  // Save PDF
  // -----------------------------

  const fileName = `Task_Report_${
    new Date().toISOString().split("T")[0]
  }.pdf`;

  doc.save(fileName);
}

export default exportTasksPdf;
