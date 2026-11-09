// Student projects: fills the list at the bottom of a project page
// from the Google Sheet "Core 1 Interaction Lab 2026 – Project URLs".
//
// On the page:
//   <section class="student-projects" data-sheet="Project 2: Recipe"> … </section>
// data-sheet is the name of the tab. Column A = name, column B = URL.
// Students without a URL are shown without a link.
// If the sheet can't be loaded, whatever is already in the section stays.

const SHEET_ID = '1yRtUoWtbv3mGVnA9evipnuB73_Rk-qO4XgWdJUgterI';

// Turns CSV text into rows: [["Student", "URL"], ["Aara", "https://…"], …]
function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') { value += '"'; i++; } // "" inside quotes = "
      else if (char === '"') inQuotes = false;
      else value += char;
    } else if (char === '"') inQuotes = true;
    else if (char === ',') { row.push(value); value = ''; }
    else if (char === '\n') { row.push(value); rows.push(row); row = []; value = ''; }
    else if (char !== '\r') value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

async function loadStudentProjects(section) {
  const url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID +
    '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(section.dataset.sheet);

  try {
    const response = await fetch(url);
    const rows = parseCSV(await response.text()).slice(1); // skip the header row

    const students = rows
      .map(function (row) { return { name: row[0].trim(), url: (row[1] || '').trim() }; })
      .filter(function (student) { return student.name; });

    // Nothing handed in yet: keep the section hidden
    if (!students.some(function (student) { return student.url; })) return;

    const p = document.createElement('p');
    students.forEach(function (student, i) {
      if (i > 0) p.append(', ');
      if (student.url) {
        const a = document.createElement('a');
        a.href = student.url;
        a.textContent = student.name;
        a.target = '_blank';
        a.rel = 'noopener';
        p.append(a);
      } else {
        p.append(student.name);
      }
    });

    section.replaceChildren(p);
    section.hidden = false;
  } catch (error) {
    // Offline or Google unreachable: leave the section as it is
  }
}

document.querySelectorAll('.student-projects[data-sheet]').forEach(loadStudentProjects);
