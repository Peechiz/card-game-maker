Vue.component('nav-links', {
  props: ['page'],
  template: `
  <nav>
    <ul>
      <li>
        <a :class='page === "view" ? "active" : ""' href='view.html'>View Decks</a>
      </li>
      <li>
        <a :class='page === "index" ? "active" : ""' href='index.html'>Add Cards</a>
      </li>
      <li>
        <a :class='page === "play" ? "active" : ""' href='play.html'>Play Deck</a>
      </li>
    </ul>
  </nav>`
})