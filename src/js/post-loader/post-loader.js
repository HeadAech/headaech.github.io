const pathToPosts = '/res/posts/';

fetch(pathToPosts + 'posts.json')
  .then(res => res.json())
  .then(postFiles => Promise.all(
    postFiles.map(file =>
      fetch(pathToPosts + file)
        .then(res => res.text())
        .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    )
  ))
  .then(posts => {
    const container = document.getElementById('posts');

    const mostRecentContainer = document.getElementById('most-recent-post');
    if (mostRecentContainer) {
        const mostRecentPost = posts[0];
        const title = mostRecentPost.querySelector('title').textContent;
        const date = mostRecentPost.querySelector('date').textContent;
        const author = mostRecentPost.querySelector('author').textContent;
        const content = mostRecentPost.querySelector('content').textContent;
        const summary = mostRecentPost.querySelector('summary').textContent;
        
        mostRecentContainer.innerHTML = `
        <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                <span style="height: 100%">✨ Most Recent Post</span>
                <a href="/src/blog/blog.html#post-${date.trim()}" style="float:right; display:inline-block;" class="btn btn-primary">Read more...</a>

            </div>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${summary}</p>
            </div>
        </div>
        `;
    }
    container.innerHTML = '';

    posts.forEach(xml => {
      const title = xml.querySelector('title').textContent;
      const date = xml.querySelector('date').textContent;
      const author = xml.querySelector('author').textContent;
      const content = xml.querySelector('content').textContent;
      let dateNoSpaces = date.replace(/\s+/g, '');
      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <div class="card" id="post-${date.trim()}">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
               <b>${title}</b>
               <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${dateNoSpaces}" aria-expanded="false" aria-controls="collapse-${dateNoSpaces}" style="float:right;">
                   Expand
               </button>
            </div>
            <div class="collapse" id="collapse-${dateNoSpaces}">
                <div class="card-body">
                    <p class="card-text">${content}</p>
                </div>
            </div>
            <div class="card-footer text-muted">
                <small>Posted: </small> ${date}
            </div>
        </div>
        <br>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Failed to load posts:', err);
    document.getElementById('posts').textContent = 'Failed to load posts.';
  });
