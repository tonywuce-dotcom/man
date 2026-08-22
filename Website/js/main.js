/**
 * 企業品牌服務形象官網 - 主要互動邏輯 (main.js)
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. 導航列滾動陰影特效
  const navbar = document.querySelector(".navbar-custom");
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
      backToTopBtn?.classList.add("show");
    } else {
      backToTopBtn?.classList.remove("show");
    }
  });

  // 2. 回到頂部按鈕平滑滾動
  backToTopBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 3. 卡片詳細資訊資料定義 (淺顯易懂的中文詳細說明)
  const serviceDetails = {
    card1: {
      title: "數位策略與顧問諮詢",
      tag: "頂層規劃",
      icon: "bi-laptop-fill",
      summary: "為您的業務量身打造清晰可行的數位轉型藍圖，不再盲目投資。",
      description: `
        <h6 class="fw-bold text-primary mb-2">服務重點說明：</h6>
        <p class="text-secondary">我們用最親切、不帶難懂術語的溝通方式，先深入了解您現有的營運痛點與目標，幫您梳理出最合適的數位策略。</p>
        <div class="bg-light p-3 rounded-3 mb-3">
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>現狀評估診斷：</strong>分析流程瓶頸，找出能省時省力的數位切入點。</li>
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>投資效益分析：</strong>評估軟硬體成本與預期回報，把每一分預算花在刀口上。</li>
            <li><i class="bi bi-check2-circle text-success me-2"></i><strong>階段實施規劃：</strong>分步驟推進，不影響日常營運，循序漸進看到成效。</li>
          </ul>
        </div>
        <p class="small text-muted mb-0">適合對象：傳產轉型、新創初期、想要優化客戶體驗與內部工作效率的中小型企業。</p>
      `,
    },
    card2: {
      title: "智慧系統客製整合",
      tag: "核心開發",
      icon: "bi-gear-wide-connected",
      summary: "將複雜的工作流程串連成一體化系統，讓資訊流通零秒差。",
      description: `
        <h6 class="fw-bold text-primary mb-2">服務重點說明：</h6>
        <p class="text-secondary">拒絕單打獨鬥的零散工具！我們替您打造專屬的管理平台、官方網站或內部作業系統，並串接現有軟體。</p>
        <div class="bg-light p-3 rounded-3 mb-3">
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>客製化雲端系統：</strong>訂單、會員、庫存或專案管理，介面簡單好上手。</li>
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>API 與跨平台串接：</strong>打通 ERP、CRM、金流物流，杜絕重複輸入人工錯誤。</li>
            <li><i class="bi bi-check2-circle text-success me-2"></i><strong>全裝置響應設計：</strong>手機、平板、電腦都能流暢操作，隨時隨地掌握進度。</li>
          </ul>
        </div>
        <p class="small text-muted mb-0">適合對象：需要自動化流程、多門市管理、或需要升級舊有老舊系統的成長型企業。</p>
      `,
    },
    card3: {
      title: "全天候運維與資安守護",
      tag: "長效支援",
      icon: "bi-shield-check",
      summary: "穩定、安全、不中斷，讓您能專注拓展業務，技術後盾由我們守護。",
      description: `
        <h6 class="fw-bold text-primary mb-2">服務重點說明：</h6>
        <p class="text-secondary">系統上線只是開始，持續的保養維護與安全防禦才是穩定獲利的基石。我們提供專人監控與快速排障。</p>
        <div class="bg-light p-3 rounded-3 mb-3">
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>定期備份與健康檢查：</strong>防止資料遺失，確保系統隨時處於最佳效能。</li>
            <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong>資安防護與漏洞修補：</strong>防堵惡意攻擊，保障客戶機密與交易安全。</li>
            <li><i class="bi bi-check2-circle text-success me-2"></i><strong>專屬技術顧問諮詢：</strong>遇問題即時通報，專業工程師迅速排除障礙。</li>
          </ul>
        </div>
        <p class="small text-muted mb-0">適合對象：重度依賴線上營運、注重客戶隱私與資料安全，希望省下自建龐大 IT 人力成本的企業。</p>
      `,
    },
  };

  // 4. 點擊卡片「了解更多」按鈕打開詳細說明 Modal
  const modalDetailTitle = document.getElementById("serviceModalTitle");
  const modalDetailContent = document.getElementById("serviceModalBody");
  const modalDetailIcon = document.getElementById("serviceModalIcon");
  const serviceModalElement = document.getElementById("serviceDetailModal");
  let bootstrapModal = null;

  if (serviceModalElement && typeof bootstrap !== "undefined") {
    bootstrapModal = new bootstrap.Modal(serviceModalElement);
  }

  const detailButtons = document.querySelectorAll(".btn-service-detail");
  detailButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const cardKey = this.getAttribute("data-card-key");
      const data = serviceDetails[cardKey];
      if (data && modalDetailTitle && modalDetailContent) {
        modalDetailTitle.textContent = data.title;
        if (modalDetailIcon) {
          modalDetailIcon.className = `bi ${data.icon} text-primary me-2`;
        }
        modalDetailContent.innerHTML = data.description;
        if (bootstrapModal) {
          bootstrapModal.show();
        }
      }
    });
  });

  // 5. 聯絡我們諮詢表單互動提交
  const contactForm = document.getElementById("contactForm");
  const formSuccessAlert = document.getElementById("formSuccessAlert");

  contactForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    // 驗證欄位
    const name = document.getElementById("userName")?.value.trim();
    const phone = document.getElementById("userPhone")?.value.trim();
    const message = document.getElementById("userMessage")?.value.trim();

    if (!name || !phone || !message) {
      alert("請填寫姓名、聯絡電話與諮詢內容，謝謝！");
      return;
    }

    // 模擬送出成功狀態
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>資料送出中...`;

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (formSuccessAlert) {
        formSuccessAlert.classList.remove("d-none");
        formSuccessAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      contactForm.reset();

      // 5秒後隱藏成功訊息
      setTimeout(function () {
        formSuccessAlert?.classList.add("d-none");
      }, 6000);
    }, 800);
  });
});
