// loadHeader.js
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // ✅ 검색창 바인딩
    const input = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');

    if (input && suggestions) {
      input.addEventListener('input', async () => {
        const keyword = input.value.trim();
        if (!keyword) {
          suggestions.innerHTML = '';
          return;
        }

        try {
          const res = await fetch(`https://birdwiki.onrender.com/api/suggest?q=${encodeURIComponent(keyword)}`);
          const titles = await res.json();
          suggestions.innerHTML = '';
          const uniqueTitles = [...new Set(titles)];
          uniqueTitles.forEach(title => {
            const li = document.createElement('li');
            li.textContent = title;
            li.className = 'suggestion-item';
            li.addEventListener('click', () => {
              window.location.href = `read.html?title=${encodeURIComponent(title)}`;
            });
            suggestions.appendChild(li);
          });
        } catch (err) {
          console.error("❌ 추천 검색어 오류:", err);
        }
      });

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const keyword = input.value.trim();
          if (keyword) {
            window.location.href = `read.html?title=${encodeURIComponent(keyword)}`;
          }
        }
      });
    }

    // ✅ 햄버거 메뉴 바인딩
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu?.querySelectorAll('.nav-link') ?? [];

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
        });
      });
    }

    // ✅ 수정 버튼 바인딩 (read.html에서만 존재)
    const editBtn = document.getElementById("edit-button");
    if (editBtn) {
      const params = new URLSearchParams(window.location.search);
      const title = params.get("title");
      editBtn.addEventListener("click", () => {
        window.location.href = `write.html?title=${encodeURIComponent(title)}&edit=true`;
      });
    }
  });
