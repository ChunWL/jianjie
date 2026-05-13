(function () {
  var page = document.body.getAttribute('data-page');
  var path = window.location.pathname;
  var prefix = path.indexOf('/blog/') !== -1 ? '../' : '';

  var navItems = [
    { id: 'home',     label: '首页', icon: 'H', href: prefix + 'index.html' },
    { id: 'about',    label: '关于', icon: 'A', href: prefix + 'about.html' },
    { id: 'projects', label: '项目', icon: 'W', href: prefix + 'projects.html' },
    { id: 'blog',     label: '博客', icon: 'B', href: prefix + 'blog/index.html' },
    { id: 'contact',  label: '联系', icon: 'C', href: prefix + 'contact.html' }
  ];

  var navHtml = '<nav class="sidebar"><a href="' + prefix + 'index.html" class="sidebar-logo">N</a>';
  navItems.forEach(function (item) {
    var activeClass = page === item.id ? ' active' : '';
    navHtml +=
      '<a href="' + item.href + '" class="sidebar-item' + activeClass + '" title="' + item.label + '">' +
      '<span class="sidebar-icon">' + item.icon + '</span>' +
      '<span class="sidebar-label">' + item.label + '</span>' +
      '</a>';
  });
  navHtml += '</nav>';

  document.body.insertAdjacentHTML('afterbegin', navHtml);

  var footerHtml =
    '<footer class="site-footer">' +
    '<p>&copy; ' + new Date().getFullYear() + ' Nathan. 用心构建。</p>' +
    '</footer>';
  document.body.insertAdjacentHTML('beforeend', footerHtml);
})();
