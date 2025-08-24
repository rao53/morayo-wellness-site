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

    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        chips.forEach(function(c){ c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        applyFilters();
      });
    });

    // Basic modal: open/close using data-modal-target attribute
    document.addEventListener('click', function(e) {
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
    var factsRoot = document.querySelector('.resource-card.interactive .facts-rotator');
    if (factsRoot) {
      var facts = Array.prototype.slice.call(factsRoot.querySelectorAll('.facts-list li')).map(function(li){ return li.textContent; });
      var factText = factsRoot.querySelector('.fact-text');
      var prevBtn = factsRoot.querySelector('[data-prev]');
      var nextBtn = factsRoot.querySelector('[data-next]');
      var idx = 0;
      function render() { if (factText && facts.length) factText.textContent = facts[idx]; }
      function inc(n) { idx = (idx + n + facts.length) % facts.length; render(); }
      if (prevBtn) prevBtn.addEventListener('click', function(){ inc(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function(){ inc(1); });
      render();
    }

    applyFilters();
  });
})();


