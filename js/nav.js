// Site index (left) and student list (right), shared by every page.
// To add a page: give the item an href.
// Each project has data-status="done", "current" or "upcoming".
// Only list projects once they've been introduced in class; update the status as the semester goes on.
// In-class activities go in the nested list under their assignment, by date.

const siteNav = `
<nav id="index" class="site-nav">

  <a class="site-title" href="index.html">Core 1: Interaction Lab</a>
  <button class="nav-toggle" type="button" aria-expanded="false">Index +</button>

  <div class="site-intro">
    <p>This is the class site for Core 1: Interaction Lab, Fall 2026. Below you'll find every prompt and the projects students made in response.</p>
    <p>Participants: Tarni Anand, Ella Arslan, Aara Chaudhuri, Sara Drobova, Katie Jia, Jackson Kim, Amber Lee, Renee Liu, Liv Marotta, Isabella Noret, Sofia Reyes Rivas, Kitty Shi, Lulu Tomahawk, Undarga Tserendorj, Florence Wu, Victoria Yim</p>
  </div>

  <ul class="projects">

    <li class="project" data-status="done">
      <a class="project-title" href="project-1-journal-a-walk.html">Project 1: Journal a Walk</a>
      <ul class="activities">
        <li class="activity"><a href="exercise-nonlinear-ways-of-reading.html">Exercise: Nonlinear Ways of Reading</a></li>
      </ul>
    </li>

    <li class="project" data-status="done">
      <a class="project-title" href="project-2-recipe.html">Project 2: Recipe</a>
      <ul class="activities">
        <li class="activity"><a href="exercise-recipe-in-figma.html">Exercise: Recipe in Figma</a></li>
        <li class="activity"><a href="exercise-type-on-the-web.html">Exercise: Type on the Web</a></li>
        <li class="activity"><a href="https://severinbunse.github.io/fork-commit-pullrequest-Core1/" target="_blank" rel="noopener">Exercise: Fork, Commit &amp; Pull Request</a></li>
      </ul>
    </li>

    <li class="project" data-status="current">
      <a class="project-title" href="project-3-visual-only-webpage.html">Project 3: Visual-Only Webpage</a>
      <ul class="activities">
        <li class="activity"><a href="exercise-coding-from-life.html">Exercise: Coding from Life</a></li>
      </ul>
    </li>

  </ul>

  <ul class="nav-links">
    <li><a href="syllabus.pdf" target="_blank" rel="noopener">Syllabus</a></li>
    <li><a href="mailto:bunses@newschool.edu">Contact</a></li>
  </ul>

</nav>
`;

// Later, each name will switch the site to that student's CSS.
const studentNav = `
<nav id="students" class="site-nav student-nav">

  <h2>Students</h2>

  <ul class="student-list">
    <li class="student">Amber</li>
    <li class="student">ella</li>
    <li class="student">Florence</li>
    <li class="student">Isabella</li>
    <li class="student">Katie</li>
    <li class="student">Kitty</li>
    <li class="student">Liv</li>
    <li class="student">Lulu</li>
    <li class="student">Renee</li>
    <li class="student">Sara</li>
    <li class="student">Tarni</li>
    <li class="student">Undarga</li>
    <li class="student">Victoria</li>
  </ul>

</nav>
`;

document.body.insertAdjacentHTML('afterbegin', siteNav);
// Student list hidden for now; uncomment the next line to show it again
// document.body.insertAdjacentHTML('beforeend', studentNav);

const currentPage = location.pathname.split('/').pop() || 'index.html';

// The home page opens the current project
// (or the syllabus, if the current project doesn't have a page yet)
if (currentPage === 'index.html') {
  const currentProject = document.querySelector('#index [data-status="current"] a.project-title');
  location.replace(currentProject ? currentProject.getAttribute('href') : 'syllabus.pdf');
}

// On phones the index is a menu: the button next to the title opens and closes it
const navToggle = document.querySelector('#index .nav-toggle');
navToggle.addEventListener('click', function () {
  const open = document.getElementById('index').classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.textContent = open ? 'Index \u2013' : 'Index +';
});

// Highlight the page you are on
document.querySelectorAll('.site-nav a').forEach(function (link) {
  if (link.getAttribute('href') === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});

// Student stylesheets: on pages with data-themes on their <body> tag,
// add ?theme=<first name> to the address to load themes/<first name>.css
if (document.body.hasAttribute('data-themes')) {
  const theme = new URLSearchParams(location.search).get('theme');
  if (theme && /^[a-z]+$/.test(theme)) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'themes/' + theme + '.css';
    document.head.appendChild(stylesheet);
  }
}

// Neko, the cat that follows your mouse (oneko.js)
// To hide the cat on a page, add data-no-cat to its <body> tag
if (!document.body.hasAttribute('data-no-cat')) {
  const neko = document.createElement('script');
  neko.src = 'js/oneko.js';
  document.body.appendChild(neko);
}
