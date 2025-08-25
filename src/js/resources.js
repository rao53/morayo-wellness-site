// Minimal resources hub interactions: search, filter, and modal toggle

(function() {
  function ready(fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function() {
    var searchInput = document.getElementById('resourceSearch');
    var chips = Array.prototype.slice.call(document.querySelectorAll('.filter-chips .chip'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.resource-grid .resource-card'));

    function applyFilters() {
      var query = (searchInput && searchInput.value || '').toLowerCase().trim();
      var activeChip = chips.find(function(c){ return c.classList.contains('active'); });
      var category = activeChip ? activeChip.getAttribute('data-filter') : 'all';

      cards.forEach(function(card) {
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var cat = card.getAttribute('data-category');
        var matchesCategory = category === 'all' || cat === category;
        var matchesQuery = !query || tags.indexOf(query) !== -1 || (card.querySelector('.card-title')?.textContent.toLowerCase().indexOf(query) !== -1);
        card.style.display = (matchesCategory && matchesQuery) ? '' : 'none';
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function() { applyFilters(); });
    }

    // Preselect filter via URL ?topic=
    (function presetFromURL(){
      var params = new URLSearchParams(window.location.search);
      var topic = params.get('topic');
      if (!topic) return;
      var targetChip = chips.find(function(c){ return c.getAttribute('data-filter') === topic; });
      if (targetChip) {
        chips.forEach(function(c){ c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
        targetChip.classList.add('active');
        targetChip.setAttribute('aria-selected', 'true');
      }
    })();

    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        var isActive = chip.classList.contains('active');
        // toggle off to 'all' if clicking the active chip
        if (isActive) {
          chips.forEach(function(c){ c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
          var allChip = chips.find(function(c){ return c.getAttribute('data-filter') === 'all'; });
          if (allChip) { allChip.classList.add('active'); allChip.setAttribute('aria-selected', 'true'); }
        } else {
          chips.forEach(function(c){ c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
          chip.classList.add('active');
          chip.setAttribute('aria-selected', 'true');
        }
        applyFilters();
      });
    });

    // Helper: secure download via Blob (avoids insecure download blocked)
    function secureDownload(url, suggestedName) {
      fetch(url, { cache: 'no-store' })
        .then(function(r){ return r.ok ? r.blob() : Promise.reject(new Error('Download failed')); })
        .then(function(blob){
          var objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = objectUrl;
          if (suggestedName) a.download = suggestedName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function(){ URL.revokeObjectURL(objectUrl); }, 1000);
        })
        .catch(function(err){ console.error(err); window.location.href = url; });
    }

    // Basic modal: open/close using data-modal-target attribute
    document.addEventListener('click', function(e) {
      // Intercept direct PDF downloads and pipe through secure blob download
      var pdfLink = e.target.closest('a[href$=".pdf"]');
      if (pdfLink) {
        e.preventDefault();
        var href = pdfLink.getAttribute('href');
        var name = pdfLink.getAttribute('download');
        secureDownload(href, name);
        return;
      }
      if (e.target.closest('.download-poster')) {
        e.preventDefault();
        var tpl = document.getElementById('poster-template');
        if (!tpl) return;
        var node = tpl.content.cloneNode(true);
        var existing = document.getElementById('poster-print');
        if (existing) existing.remove();
        document.body.appendChild(node);

        // Set a friendly title so the browser suggests a neat PDF name
        var prevTitle = document.title;
        document.title = 'Morayo-Wellness-Did-You-Know';

        // Clean up after printing
        var cleanup = function() {
          var el = document.getElementById('poster-print');
          if (el) el.remove();
          document.title = prevTitle;
          window.removeEventListener('afterprint', cleanup);
        };
        window.addEventListener('afterprint', cleanup);

        window.print();
        return;
      }
      var openBtn = e.target.closest('[data-modal-target]');
      if (openBtn) {
        var sel = openBtn.getAttribute('data-modal-target');
        var modal = document.querySelector(sel);
        if (modal) modal.classList.add('open');
      }
      if (e.target.matches('.modal') || e.target.matches('.modal-close')) {
        var modalRoot = e.target.closest('.modal');
        if (modalRoot) modalRoot.classList.remove('open');
      }
    });

    // Keyboard support for cards-as-buttons
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var target = document.activeElement;
      if (target && target.hasAttribute('data-modal-target')) {
        e.preventDefault();
        var sel = target.getAttribute('data-modal-target');
        var modal = document.querySelector(sel);
        if (modal) modal.classList.add('open');
      }
    });

    // Simple facts rotator for the interactive highlights card
    // old rotator removed for infographic layout

    applyFilters();
  });
})();


