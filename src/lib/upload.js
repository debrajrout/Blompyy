export async function upload(ev, callbackFn) {
  const file = ev.target.files[0];
  if (file) {
    const data = new FormData();
    data.set("file", file);
    fetch("/api/upload", {
      method: "POST",
      body: data,
    }).then((response) => {
      response.json().then((link) => {
        callbackFn(link);
      });
    });
  }
}
