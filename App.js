const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let videoStream;
let imgs = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!videoStream) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoStream = stream;
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();
        video.addEventListener("loadedmetadata", () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imageURL;
          link.download = "surat.png";
          link.click();
          imgs.push(link);
        });
      })
      .catch((error) => {
        console.error("Xato: Kameraga kirishda muammo:", error);
      });
  }
});
console.log(imgs);
