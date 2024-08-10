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
  const markdownText = document.getElementById('mkd-txt').textContent; // Get the content from the textarea
  if (markdownText.trim() === "") {
      alert("Please enter some markdown text before downloading.");
      return;
  }
  const blob = new Blob([markdownText], { type: 'text/markdown' }); // Create a new Blob with the markdown text
  const url = URL.createObjectURL(blob); // Create a URL for the Blob
  
  const a = document.createElement('a'); // Create an anchor element
  a.href = url; // Set the href to the Blob URL
  a.download = 'document.md'; // Set the default filename
  document.body.appendChild(a); // Append the anchor to the body
  a.click(); // Programmatically click the anchor to trigger the download
  document.body.removeChild(a); // Remove the anchor from the document
  URL.revokeObjectURL(url); // Clean up the URL object
}

