document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
  });

  document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,12}$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!phoneRegex.test(contact)) {
      alert("Contact number should be 10 to 12 digits.");
      return;
    }

    addStudent(name, studentId, email, contact);
    saveStudents();
    this.reset();
  });

  function addStudent(name, studentId, email, contact) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${studentId}</td>
      <td>${email}</td>
      <td>${contact}</td>
      <td><span class="edit-btn" onclick="editStudent(this)">Edit</span></td>
      <td><span class="delete-btn" onclick="deleteStudent(this)">Delete</span></td>
    `;
    document.getElementById("studentList").appendChild(row);
  }

  function editStudent(el) {
    const row = el.closest("tr");
    document.getElementById("name").value = row.children[0].textContent;
    document.getElementById("studentId").value = row.children[1].textContent;
    document.getElementById("email").value = row.children[2].textContent;
    document.getElementById("contact").value = row.children[3].textContent;
    row.remove();
    saveStudents();
  }

  function deleteStudent(el) {
    el.closest("tr").remove();
    saveStudents();
  }

  function saveStudents() {
    const rows = document.querySelectorAll("#studentList tr");
    const data = Array.from(rows).map(row => ({
      name: row.children[0].textContent,
      studentId: row.children[1].textContent,
      email: row.children[2].textContent,
      contact: row.children[3].textContent
    }));
    localStorage.setItem("students", JSON.stringify(data));
  }

  function loadStudents() {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    stored.forEach(student => addStudent(student.name, student.studentId, student.email, student.contact));
  }