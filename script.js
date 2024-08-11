function addSection() {
  const newSection = document.createElement("div");
  newSection.className = "section";
  newSection.innerHTML = `
        <label for="heading-input" class="heading"># Heading</label>
        <input class="heading-input" placeholder="Enter text here." oninput="updateMarkdown()">
  
        <label for="description-input" class="description"># Description</label>
        <textarea class="description-input" id="description-input" rows="2" placeholder="Enter Description." oninput="updateMarkdown()"></textarea>
  
        <div class="code-area">
            <label for="code-input" class="code"># Enter CODE</label>
            <select class="language" onchange="updateMarkdown()">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
                <option value="css">CSS</option>
                <option value="dart">Dart</option>
                <option value="go">GO</option>
                <option value="html">HTML</option>
                <option value="json">JSON</option>
                <option value="kotlin">Kotlin</option>
                <option value="markdown">Markdown</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="sql">SQL</option>
                <option value="typescript">TypeScript</option>
                <option value="xml">XML</option>
            </select>
        </div>
        <textarea class="code-input" id="code-input" rows="5" placeholder="Write your code." oninput="updateMarkdown()"></textarea>
  
        <div class="change-section-btn">
            <button class="add-section" onclick="addSection()">Add Section</button>
            <button class="del-section" onclick="deleteSection(this)">Delete Section</button>
        </div>
    `;
  document.getElementById("sections-container").appendChild(newSection);
  console.log(document.getElementById("sections-container").children);
}

function deleteSection(button) {
  const section = button.closest(".section");
  if (section) {
    section.remove();
    updateMarkdown(); // Update the markdown after deleting a section
  }
}

// -------------------------------------------------------
let count1 = 0;
const mkdSection = document.getElementById("mkd");

function openMarkdown() {
  count1++;
  mkdSection.style.display = count1 % 2 === 1 ? "flex" : "none";
}

// -------------------------------------------------------
let count2 = 0;
const pvwSection = document.getElementById("pvw");

function openPreview() {
  count2++;
  pvwSection.style.display = count2 % 2 === 1 ? "flex" : "none";
}

// -------------------------------------------------------

// -------------------update markdown
function updateMarkdown() {
  const sections = document.querySelectorAll(".section");
  let markdown = "";

  sections.forEach((section) => {
    const heading = section.querySelector(".heading-input").value;
    const description = section.querySelector(".description-input").value;
    const code = section.querySelector(".code-input").value;
    const language = section.querySelector(".language").value;

    if (heading) {
      markdown += `## ${heading}\n\n`;
    }
    if (description) {
      markdown += `${description}\n\n`;
    }
    if (code) {
      markdown += "```" + language + "\n";
      markdown += code + "\n";
      markdown += "```\n\n";
    }
  });

  document.getElementById("mkd-txt").textContent = markdown;
  renderMarkdown(markdown);
}

// ---------------------preview
function renderMarkdown(markdown) {
  const html = marked(markdown);
  document.getElementById("pvw-txt").innerHTML = html;

  // Highlight the code in the preview
  Prism.highlightAll();
}

// ------------------------download
function downloadMarkdown() {
  const markdownText = document.getElementById("mkd-txt").textContent; // Get the content from the textarea
  if (markdownText.trim() === "") {
    alert("Please enter some markdown text before downloading.");
    return;
  }
  const blob = new Blob([markdownText], { type: "text/markdown" }); // Create a new Blob with the markdown text
  const url = URL.createObjectURL(blob); // Create a URL for the Blob

  const a = document.createElement("a"); // Create an anchor element
  a.href = url; // Set the href to the Blob URL
  a.download = "document.md"; // Set the default filename
  document.body.appendChild(a); // Append the anchor to the body
  a.click(); // Programmatically click the anchor to trigger the download
  document.body.removeChild(a); // Remove the anchor from the document
  URL.revokeObjectURL(url); // Clean up the URL object
}

// ----------------------- local storage

// Save sections to localStorage
function updateLocal() {
  const sections = [];
  const sectionElements = document.querySelectorAll(".section");
  sectionElements.forEach((section) => {
    const heading = section.querySelector(".heading-input").value;
    const description = section.querySelector(".description-input").value;
    const code = section.querySelector(".code-input").value;
    const language = section.querySelector(".language").value;

    sections.push({ heading, description, code, language });
  });
  localStorage.setItem("sections", JSON.stringify(sections));
  // -------------------------------------------------------------
  alert("Storage has been updated!")
}

// -----------------------------------------------clear storage

function clearLocal() {
  localStorage.clear();
  alert("Storage has been cleared!");
}

// -----------------------------------------------reload storage

function loadLocal() {
  const sections = JSON.parse(localStorage.getItem("sections")) || [];
  sections.forEach((section) => {
    const newSection = document.createElement("div");
    newSection.className = "section";
    newSection.innerHTML = `
          <label for="heading-input" class="heading"># Heading</label>
          <input class="heading-input" value="${
            section.heading
          }" oninput="updateMarkdown()">

          <label for="description-input" class="description"># Description</label>
          <textarea class="description-input" rows="2" oninput="updateMarkdown()">${
            section.description
          }</textarea>

          <div class="code-area">
              <label for="code-input" class="code"># Enter CODE</label>
              <select class="language" onchange="updateMarkdown()">
                  <option value="javascript" ${
                    section.language === "javascript" ? "selected" : ""
                  }>JavaScript</option>
                  <option value="python" ${
                    section.language === "python" ? "selected" : ""
                  }>Python</option>
                  <option value="java" ${
                    section.language === "java" ? "selected" : ""
                  }>Java</option>
                  <option value="csharp" ${
                    section.language === "csharp" ? "selected" : ""
                  }>C#</option>
                  <option value="cpp" ${
                    section.language === "cpp" ? "selected" : ""
                  }>C++</option>
                  <option value="c" ${
                    section.language === "c" ? "selected" : ""
                  }>C</option>
                  <option value="rust" ${
                    section.language === "rust" ? "selected" : ""
                  }>Rust</option>
                  <option value="swift" ${
                    section.language === "swift" ? "selected" : ""
                  }>Swift</option>
                  <option value="css" ${
                    section.language === "css" ? "selected" : ""
                  }>CSS</option>
                  <option value="dart" ${
                    section.language === "dart" ? "selected" : ""
                  }>Dart</option>
                  <option value="go" ${
                    section.language === "go" ? "selected" : ""
                  }>GO</option>
                  <option value="html" ${
                    section.language === "html" ? "selected" : ""
                  }>HTML</option>
                  <option value="json" ${
                    section.language === "json" ? "selected" : ""
                  }>JSON</option>
                  <option value="kotlin" ${
                    section.language === "kotlin" ? "selected" : ""
                  }>Kotlin</option>
                  <option value="markdown" ${
                    section.language === "markdown" ? "selected" : ""
                  }>Markdown</option>
                  <option value="php" ${
                    section.language === "php" ? "selected" : ""
                  }>PHP</option>
                  <option value="ruby" ${
                    section.language === "ruby" ? "selected" : ""
                  }>Ruby</option>
                  <option value="sql" ${
                    section.language === "sql" ? "selected" : ""
                  }>SQL</option>
                  <option value="typescript" ${
                    section.language === "typescript" ? "selected" : ""
                  }>TypeScript</option>
                  <option value="xml" ${
                    section.language === "xml" ? "selected" : ""
                  }>XML</option>
              </select>
          </div>
          <textarea class="code-input" rows="5" placeholder="Write your code." oninput="updateMarkdown()">${
            section.code
          }</textarea>

          <div class="change-section-btn">
              <button class="add-section" onclick="addSection()">Add Section</button>
              <button class="del-section" onclick="deleteSection(this)">Delete Section</button>
          </div>
      `;
    document.getElementById("sections-container").appendChild(newSection);
  });
  updateMarkdown();
}

// ---------------------------------------------------------

// Get the button element
const update = document.querySelector("#local-update");
const clear = document.querySelector("#local-clear");
const load = document.querySelector("#local-load");

// Add a mouseover event listener
update.addEventListener("mouseover", () => {
  // Change the button's background color
  update.textContent = "update";
});

// Add a mouseout event listener
update.addEventListener("mouseout", () => {
  // Change the button's background color back to its original color
  update.innerHTML = `<ion-icon name="arrow-up-outline"></ion-icon>`;
});

// ================

// Add a mouseover event listener
clear.addEventListener("mouseover", () => {
  // Change the button's background color
  clear.textContent = "Clear";
});

// Add a mouseout event listener
clear.addEventListener("mouseout", () => {
  // Change the button's background color back to its original color
  clear.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
});

// ================

// Add a mouseover event listener
load.addEventListener("mouseover", () => {
  // Change the button's background color
  load.textContent = "Reload";
});

// Add a mouseout event listener
load.addEventListener("mouseout", () => {
  // Change the button's background color back to its original color
  load.innerHTML = `<ion-icon name="reload-outline"></ion-icon>`;
});

// ----------------------------------------------------

const socialtrigger = document.getElementById("social-trigger");
const social = document.getElementById("social");
const localtrigger = document.getElementById("local-trigger");
const local = document.getElementById("local");

let c1 = 0;
let c2 = 0;

socialtrigger.addEventListener("click", () => {
  c1++;
  if (c1 % 2 == 1) {
    social.style.display = "flex";
    if (c2 % 2 == 1 && c2 > 0) {
      local.style.display = "none";
      c2--;
    }
  }

  if (c1 % 2 == 0) {
    social.style.display = "none";
  }
});

localtrigger.addEventListener("click", () => {
  c2++;
  if (c2 % 2 == 1) {
    local.style.display = "flex";
    if (c1 % 2 == 1 && c1 > 0) {
      social.style.display = "none";
      c1--;
    }
  }

  if (c2 % 2 == 0) {
    local.style.display = "none";
  }
});

// ----------------------------------

// Get the button element
const markdown = document.querySelector(".markdown");
const download = document.querySelector(".download");
const preview = document.querySelector(".preview");

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 450px)");

function myFunction(x) {
  if (x.matches) {
    markdown.innerHTML = `<ion-icon name="logo-markdown"></ion-icon>`;
    download.innerHTML = `<ion-icon name="download"></ion-icon>`;
    preview.innerHTML = `<ion-icon name="code"></ion-icon>`;

    // If media query matches
    // Add a mouseover event listener
    markdown.addEventListener("mouseover", () => {
      // Change the button's background color
      markdown.textContent = "markdown";
    });

    // Add a mouseout event listener
    markdown.addEventListener("mouseout", () => {
      // Change the button's background color back to its original color
      markdown.innerHTML = `<ion-icon name="logo-markdown"></ion-icon>`;
    });

    // ================

    // Add a mouseover event listener
    download.addEventListener("mouseover", () => {
      // Change the button's background color
      download.textContent = "Download";
    });

    // Add a mouseout event listener
    download.addEventListener("mouseout", () => {
      // Change the button's background color back to its original color
      download.innerHTML = `<ion-icon name="download"></ion-icon>`;
    });

    // ================

    // Add a mouseover event listener
    preview.addEventListener("mouseover", () => {
      // Change the button's background color
      preview.textContent = "Preview";
    });

    // Add a mouseout event listener
    preview.addEventListener("mouseout", () => {
      // Change the button's background color back to its original color
      preview.innerHTML = `<ion-icon name="code"></ion-icon>`;
    });
  } else {
    markdown.textContent = "markdown";
    download.textContent = "Download";
    preview.textContent = "Preview";
  }
}

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
  myFunction(x);
});

// ---------------------------------------------------------

const visualcircle = document.getElementById("visual-circle");
const visualholder = document.getElementById("visual-holder");

let c3 = 0;

visualcircle.addEventListener("click", () => {
  c3++;
  if (c3 % 2 == 1) {
    visualholder.style.display = "flex";
  }

  if (c3 % 2 == 0) {
    visualholder.style.display = "none";
    if (
      mkdSection.style.display == "flex" &&
      pvwSection.style.display == "flex"
    ) {
      mkdSection.style.display = "none";
      count1--;
      pvwSection.style.display = "none";
      count2--;
    }
    if (mkdSection.style.display == "flex") {
      mkdSection.style.display = "none";
      count1--;
    }
    if (pvwSection.style.display == "flex") {
      pvwSection.style.display = "none";
      count2--;
    }
  }
});
