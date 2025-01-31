(() => {
  console.log("content.js is running!");

  // Prevent multiple injections
  if (window.hasRunColemakExtension) {
    console.log("Colemak extension script already injected.");
    return;
  }
  window.hasRunColemakExtension = true;

  // Create the dialog container
  const dialog = document.createElement("div");
  dialog.id = "colemakDialog";
  dialog.style.position = "fixed";
  dialog.style.bottom = "50px";
  dialog.style.right = "50px";
  dialog.style.width = "400px";
  dialog.style.height = "500px";
  dialog.style.background = "white";
  dialog.style.border = "1px solid #ccc";
  dialog.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  dialog.style.borderRadius = "10px";
  dialog.style.padding = "20px";
  dialog.style.display = "flex";
  dialog.style.flexDirection = "column";
  dialog.style.zIndex = "9999";
  dialog.style.fontFamily = "Arial, sans-serif";

  // Title
  const title = document.createElement("h1");
  title.textContent = "Colemak Text Area";
  title.style.textAlign = "center";
  title.style.fontSize = "1.5rem";
  title.style.marginBottom = "10px";
  dialog.appendChild(title);

  // Textarea
  const textarea = document.createElement("textarea");
  textarea.id = "colemakTextArea";
  textarea.style.flexGrow = "1";
  textarea.style.width = "100%";
  textarea.style.resize = "none";
  textarea.style.padding = "10px";
  textarea.style.fontSize = "1rem";
  dialog.appendChild(textarea);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "10px";
  dialog.appendChild(buttonContainer);

  // Create buttons
  const buttons = [
    { id: "saveToFileButton", text: "Save to File", class: "btn btn-primary" },
    { id: "copyButton", text: "Copy", class: "btn btn-success" },
    { id: "copyAndClearButton", text: "Copy and Clear", class: "btn btn-outline-info" },
  ];

  buttons.forEach((btnData) => {
    const button = document.createElement("button");
    button.id = btnData.id;
    button.textContent = btnData.text;
    button.className = btnData.class;
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    buttonContainer.appendChild(button);
  });

  // Message for copy confirmation
  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Content copied to clipboard";
  message.style.textAlign = "center";
  message.style.color = "green";
  message.style.display = "none";
  message.style.marginTop = "10px";
  dialog.appendChild(message);

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.background = "red";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.borderRadius = "50%";
  closeButton.style.width = "25px";
  closeButton.style.height = "25px";
  closeButton.style.fontSize = "14px";
  closeButton.style.fontWeight = "bold";
  dialog.appendChild(closeButton);

  // Append dialog to body
  document.body.appendChild(dialog);
  console.log("Dialog created successfully.");

  // Button event listeners
  document.getElementById("copyButton").addEventListener("click", async () => {
    try {
      window.focus();
      await navigator.clipboard.writeText(textarea.value);
      console.log("Text copied:", textarea.value);
      message.textContent = "Content copied!";
      message.style.display = "block";
      setTimeout(() => (message.style.display = "none"), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
      message.textContent = "Copy failed. Try manually selecting and copying.";
      message.style.color = "red";
      message.style.display = "block";
    }
  });

  document.getElementById("copyAndClearButton").addEventListener("click", async () => {
    try {
      window.focus();
      await navigator.clipboard.writeText(textarea.value);
      console.log("Text copied & cleared:", textarea.value);
      textarea.value = "";
      message.textContent = "Copied & Cleared!";
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
        document.body.removeChild(dialog);
        window.hasRunColemakExtension = false;
        console.log("Dialog closed.");
      }, 1500);
    } catch (err) {
      console.error("Clipboard write failed:", err);
      message.textContent = "Copy failed. Try manually selecting and copying.";
      message.style.color = "red";
      message.style.display = "block";
    }
  });

  closeButton.addEventListener("click", () => {
    document.body.removeChild(dialog);
    window.hasRunColemakExtension = false;
    console.log("Dialog closed.");
  });
})();
