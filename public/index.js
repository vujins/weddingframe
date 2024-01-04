
function setLoading(isLoading) {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = isLoading ? "block" : "none";
  }

  async function onFileInputChange(e) {
    const fileInput = e.target;
    const filesToUpload = fileInput.files;

    if (filesToUpload.length === 0) {
      return;
    }

    // disable after we get all images
    fileInput.disabled = true;

    setLoading(true);

    try {
      const promises = [];

      for (const file of filesToUpload) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child("Jelena2024/" + file.name);
        promises.push(fileRef.put(file));
      }

      const results = await Promise.all(promises);

      const successfulResults = results.filter(
        (r) => r.state === "success"
      ).length;

      alert(`Successfully uploaded ${successfulResults} images!`);
    } catch (error) {
      alert("Failed to upload images!");
    } finally {
      fileInput.disabled = false;
      setLoading(false);
    }
  }
