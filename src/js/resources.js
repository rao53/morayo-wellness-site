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
    // old rotator removed for infographic layout

    applyFilters();
  });
})();


