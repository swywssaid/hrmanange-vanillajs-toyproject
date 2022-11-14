// 초기 페이지
const dropdown = document.getElementById("drop-select");
const pagination = document.getElementById("pagination");

fetch("./src/data.json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // 초기 테이블
    const tableData = data;
    const table = document.getElementById("table");

    let user = [];

    for (let id = 0; id < dropdown.value; id++) {
      user.push(`<tr><td>${tableData[id].name}</td><td>${tableData[id].title}</td><td>${tableData[id].email}</td><td>${tableData[id].role}</td></tr>`);
    }
    table.innerHTML = `<table><thead><tr><th>name</th><th>title</th><th>email</th><th>role</th></tr></thead><tbody>${user.join("")}</tbody></table>`;

    // 초기 페이지 번호
    let page;
    let pages = [];
    for (page = 2; page < Math.ceil(tableData.length / dropdown.value) + 1; page++) {
      pages.push(`<button onclick="changeTable(${page})" id=${page}>${page}</button>`);
    }
    pagination.innerHTML = `<button onclick="changeTable(${page})" class="arrow"><<</button><button onclick="changeTable()" id="1" style="color: red">1</button>${pages.join(
      ""
    )}<button onclick="changeTable(${page})" class="arrow">>></button>`;
    console.log("성공:", data, tableData[0].name, user.join(""), dropdown.value, pages);
  })
  .catch((error) => {
    console.error("실패:", error);
  });

// 페이지 버튼 클릭 시
pagination.classList.addEventListener("click", (clickedPage) => {
  console.log("clickedPage!!!!!!!!!!!!", clickedPage.target.id);
  fetch("./src/data.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // 클릭 시 테이블
      const tableData = data;
      const table = document.getElementById("table");

      let user = [];

      for (let id = (clickedPage.target.id - 1) * dropdown.value; id < clickedPage.target.id * dropdown.value; id++) {
        user.push(`<tr><td>${tableData[id].name}</td><td>${tableData[id].title}</td><td>${tableData[id].email}</td><td>${tableData[id].role}</td></tr>`);
      }
      table.innerHTML = `<table><thead><tr><th>name</th><th>title</th><th>email</th><th>role</th></tr></thead><tbody>${user.join("")}</tbody></table>`;

      // 클릭 시 페이지 번호
      let pages = [];
      let page;
      for (page = 1; page < Math.ceil(tableData.length / dropdown.value) + 1; page++) {
        if (clickedPage.target.id == page) {
          pages.push(`<button onclick="changeTable(${page})" id=${page} style="color: red">${page}</button>`);
        } else {
          pages.push(`<button onclick="changeTable(${page})" id=${page}>${page}</button>`);
        }
      }
      pagination.innerHTML = `<button onclick="changeTable(${page})" class="arrow"><<</button>${pages.join(
        ""
      )}<button onclick="changeTable(${page})" class="arrow">>></button>`;
    })
    .catch((error) => {
      console.error("실패:", error);
    });
});

// 드롭다운 5개일때 15개일때 구분
dropdown.addEventListener("change", (selectedDrop) => {
  console.log("clickedPage!!!!!!!!!!!!", selectedDrop.target.value);
  pagination.addEventListener("click", (clickedPage) => {
    console.log("clickedPage!!!!!!!!!!!!", clickedPage.target.id);
    fetch("./src/data.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 클릭 시 테이블
        const tableData = data;
        const table = document.getElementById("table");

        let user = [];

        for (let id = (clickedPage.target.id - 1) * selectedDrop.target.value; id < clickedPage.target.id * selectedDrop.target.value; id++) {
          user.push(`<tr><td>${tableData[id].name}</td><td>${tableData[id].title}</td><td>${tableData[id].email}</td><td>${tableData[id].role}</td></tr>`);
        }
        table.innerHTML = `<table><thead><tr><th>name</th><th>title</th><th>email</th><th>role</th></tr></thead><tbody>${user.join("")}</tbody></table>`;

        // 클릭 시 페이지 번호
        let pages = [];
        let page;
        for (page = 1; page < Math.ceil(tableData.length / selectedDrop.target.value) + 1; page++) {
          if (clickedPage.target.id == page) {
            pages.push(`<button onclick="changeTable(${page})" id=${page} style="color: red">${page}</button>`);
          } else {
            pages.push(`<button onclick="changeTable(${page})" id=${page}>${page}</button>`);
          }
        }
        pagination.innerHTML = `<button onclick="changeTable(${page})" class="arrow"><<</button>${pages.join(
          ""
        )}<button onclick="changeTable(${page})" class="arrow">>></button>`;
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  });
});
