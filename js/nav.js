Vue.component('nav-links', {
  props: ['page'],
  template: `
  <nav>
    <ul>
      <li>
        <a :class='page === "deck" ? "active" : ""' href='deckMaker.html'>Make Decks</a>
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

// TODO refactor to disallow links on active page?