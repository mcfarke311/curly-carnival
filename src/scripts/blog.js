const searchInput = document.querySelector('.blog-search input');
const postItems = document.querySelectorAll('.post-item');
const tagButtons = document.querySelectorAll('.blog-tag');
const noResults = document.querySelector('.no-results');

let activeTag = null;

function filterPosts() {
  const query = searchInput?.value.toLowerCase() || '';
  let visible = 0;

  postItems.forEach((item) => {
    const title = item.getAttribute('data-title') || '';
    const tags = item.getAttribute('data-tags') || '';
    const matchesSearch = !query || title.includes(query) || tags.includes(query);
    const matchesTag = !activeTag || tags.split(',').includes(activeTag);

    if (matchesSearch && matchesTag) {
      item.style.display = '';
      visible++;
    } else {
      item.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = visible === 0 ? '' : 'none';
  }
}

searchInput?.addEventListener('input', filterPosts);

tagButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tag = btn.getAttribute('data-tag');

    if (activeTag === tag) {
      activeTag = null;
      btn.classList.remove('active');
    } else {
      tagButtons.forEach((b) => b.classList.remove('active'));
      activeTag = tag;
      btn.classList.add('active');
    }

    filterPosts();
  });
});

// Check URL for ?tag= on load
const params = new URLSearchParams(window.location.search);
const initialTag = params.get('tag');
if (initialTag) {
  activeTag = initialTag;
  tagButtons.forEach((btn) => {
    if (btn.getAttribute('data-tag') === initialTag) {
      btn.classList.add('active');
    }
  });
  filterPosts();
}
