const e = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Fake data
let students = [
    { student_id: 1, name: 'John Doe', age: 17, level: 'high school', GPA: 3.87},
    { student_id: 2, name: 'Jane Smith', age: 18, level: 'high school', GPA: 3.51},
    { student_id: 3, name: 'Sam Brown', age: 16, level: 'high school', GPA: 3.52},
    { student_id: 4, name: 'Lucy White', age: 16, level: 'high school', GPA: 3.95},
    { student_id: 5, name: 'Mike Green', age: 17, level: 'high school', GPA: 3.22},
];


app.get('/', (req, res) => {
res.send('Hello, REST APIs! For testing the student endpoint, use /api/students');
});

//Get all products by REST API
//Endpoint: /api/products
app.get('/api/students', (req, res) => {
res.json(students);
});

// 2️ Get a student by ID
// Endpoint: GET /api/students/:id
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.student_id === studentId);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// 3️ Create a new student
// Endpoint: POST /api/students
app.post('/api/students', (req, res) => {
  const newStudent = req.body;

  newStudent.student_id = students.length
    ? students[students.length - 1].student_id + 1
    : 1;

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4️ Update a student by ID
// Endpoint: PUT /api/students/:id
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.student_id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Merge old data + new data
  students[studentIndex] = {
    ...students[studentIndex],
    ...req.body
  };

  res.json(students[studentIndex]);
});

// 5️ Delete a student by ID
// Endpoint: DELETE /api/students/:id
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.student_id === studentId);

  if (studentIndex !== -1) {
    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent[0]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
