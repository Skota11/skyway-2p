<script>
export let id;

import Peer from "skyway-js"

// ピアの準備
const peer = new Peer(id, {
  key: "d967a2d6-2869-4566-b795-081ee95ebeeb",
  debug: 3,
});

peer.on('close', () => {
alert('通信が切断しました。');
});

window.onload = function () {
	peer.on("open", () => {
	  document.getElementById("my-id").textContent = peer.id;
	});
	// 接続要求時の受信時に呼ばれる
	peer.on("call", (mediaConnection) => {
	  mediaConnection.answer(localStream);
	  setEventListener(mediaConnection);
	});

	// カメラ映像の取得
	let localStream;
	navigator.mediaDevices
	  .getUserMedia({ video: true, audio: true })
	  // 成功時
	  .then((stream) => {
	    // video要素でカメラ映像を再生
	    const videoElm = document.getElementById("my-video");
	    videoElm.srcObject = stream;
	    videoElm.play();

	    // ストリームの保持
	    localStream = stream;
	  })
	  // エラー時
	  .catch((error) => {
	    console.error("カメラ映像の取得失敗:", error);
	    return;
	  });

	// 接続要求の送信
	document.getElementById("make-call").onclick = () => {
	  const theirID = document.getElementById("their-id").value;
	  const mediaConnection = peer.call(theirID, localStream);
	  setEventListener(mediaConnection);
	};

	// 接続時に呼ばれる
	const setEventListener = (mediaConnection) => {
	  mediaConnection.on("stream", (stream) => {
	    // video要素でカメラ映像を再生
	    const videoElm = document.getElementById("their-video");
	    videoElm.srcObject = stream;
	    videoElm.play();
	  });
	};
  };
</script>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <!--自分-->
    <div>自分のPeerID: <span id="my-id"></span></div>
    <video id="my-video" width="400px" autoplay muted playsinline></video>
    <br>

    <!--相手-->
    <div>
      相手のPeerID: <input id="their-id" />
      <button id="make-call">発信</button>
    </div>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video id="their-video" width="400px" autoplay playsinline></video>
    <br>
  </body>
