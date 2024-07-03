
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
        const fileRef = storageRef.child("Milica2024/" + file.name);
        promises.push(fileRef.put(file));
      }

      const results = await Promise.all(promises);

      const successfulResults = results.filter(
        (r) => r.state === "success"
      ).length;

      alert(`Uspesno ste podelili slike sa svadbe! 🎉🎉🎉 Broj podeljenih slika ${successfulResults} 🖼️`);
    } catch (error) {
      alert("Niste uspeli da podelite slike 😭");
    } finally {
      fileInput.disabled = false;
      setLoading(false);
    }
  }
