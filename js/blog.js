var POSTS = [
  {
    slug: 'hello-world',
    title: '你好，世界',
    date: '2026-05-13',
    readTime: '阅读 2 分钟'
  }
];

function renderBlogList(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  if (POSTS.length === 0) {
    container.innerHTML = '<p>暂无文章，敬请期待！</p>';
    return;
  }

  var html = '';
  POSTS.forEach(function (post) {
    html +=
      '<a href="post.html?slug=' + post.slug + '" class="post-card">' +
      '<h3>' + post.title + '</h3>' +
      '<span class="post-meta">' + post.date + ' &middot; ' + post.readTime + '</span>' +
      '</a>';
  });
  container.innerHTML = html;
}

async function renderBlogPost(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');

  if (!slug) {
    container.innerHTML = '<p>未指定文章。</p>';
    return;
  }

  var post = POSTS.find(function (p) { return p.slug === slug; });
  if (!post) {
    container.innerHTML = '<p>文章未找到。</p>';
    return;
  }

  document.title = post.title + ' &mdash; Nathan';

  try {
    var resp = await fetch('posts/' + slug + '.md');
    if (!resp.ok) throw new Error('加载失败');
    var md = await resp.text();
    var html = marked.parse(md);

    container.innerHTML =
      '<article class="blog-article">' +
      '<h1>' + post.title + '</h1>' +
      '<div class="post-meta">' + post.date + ' &middot; ' + post.readTime + '</div>' +
      '<div class="post-body">' + html + '</div>' +
      '</article>';
  } catch (e) {
    container.innerHTML = '<p>文章加载失败，请稍后重试。</p>';
  }
}
