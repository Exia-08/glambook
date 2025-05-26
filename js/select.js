 (function(){
      const dropdown = document.getElementById('custom-multi-select');
      const toggle = document.getElementById('dropdown-toggle');
      const menu = document.getElementById('dropdown-menu');
      const selectedText = document.getElementById('selected-text');
      const checkboxes = menu.querySelectorAll('input[type=checkbox]');
      function updateSelectedText() {
        const selected = Array.from(checkboxes)
          .filter(chk => chk.checked)
          .map(chk => chk.value);
        if (selected.length === 0) {
          selectedText.textContent = 'Select';
        } else if (selected.length <= 3) {
          selectedText.textContent = selected.join(', ');
        } else {
          selectedText.textContent = selected.length + ' options selected';
        }
      }
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });
      // Close dropdown if clicked outside
      document.addEventListener('click', () => {
        closeDropdown();
      });
        // Keyboard accessibility: space or enter toggles dropdown
      dropdown.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isOpen = dropdown.classList.contains('open');
          if (isOpen) {
            closeDropdown();
          } else {
            openDropdown();
          }
        }
        // ESC closes dropdown
        if (e.key === 'Escape') {
          closeDropdown();
          toggle.focus();
        }
      });
      checkboxes.forEach(chk => {
        chk.addEventListener('change', () => {
          updateSelectedText();
        });
      });
      function openDropdown() {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
      function closeDropdown() {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
      // Initialize text
      updateSelectedText();
    })();