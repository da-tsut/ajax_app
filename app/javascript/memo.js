function memo() {
  const submit = document.getElementById("submit");
  // メモをクリックした場合に実行する処理を定義している
  submit.addEventListener("click", (e) => {
    // 指定したHTMLなどを、特定の要素に描画している
    const formData = new FormData(document.getElementById("form"));
      // Ajaxに必要なオブジェクトを生成している
    const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
    XHR.open("POST", "/posts", true);
      // レスポンスのタイプを指定する
    XHR.responseType = "json";
    XHR.send(formData);
      // レスポンスを受け取った時の処理を記述する
    XHR.onload = () => {
      if (XHR.status != 200) {
      // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返却されたメモのレコードデータを取得している
      const item = XHR.response.post;
      // 描画する親要素のlistの要素を取得する
      const list = document.getElementById("list");
      // メモの入力フォームをリセットする
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      // afterendを指定することで、要素listの直後に挿入する
      list.insertAdjacentHTML("afterend", HTML);
      // メモの入力フォームに入力されたままの文字をリセットする
      formText.value = "";
    };
      //現在進行中の動作を中止する
    e.preventDefault();
  });
}
window.addEventListener("load", memo);