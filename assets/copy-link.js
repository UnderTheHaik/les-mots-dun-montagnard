(() => {
  document.querySelectorAll('[data-copy-link]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const container = button.closest('.lmdm-share');
      const status = container.querySelector('[role="status"]');
      const url = document.querySelector('link[rel="canonical"]')?.href || location.href.split('#')[0];
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Presse-papiers indisponible');
        await navigator.clipboard.writeText(url);
        status.textContent = 'Le lien a été copié.';
        container.querySelector('.lmdm-copy-fallback')?.remove();
      } catch {
        let input = container.querySelector('.lmdm-copy-fallback');
        if (!input) {
          input = document.createElement('input');
          input.className = 'lmdm-copy-fallback';
          input.readOnly = true;
          input.setAttribute('aria-label', 'Lien du poème à copier');
          container.append(input);
        }
        input.value = url;
        input.focus();
        input.select();
        status.textContent = 'Sélectionnez et copiez ce lien.';
      }
    });
  });
})();
