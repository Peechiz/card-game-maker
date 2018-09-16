let app = new Vue({
  el: '#app',
  data: {
    selectedDeck: {
      name: null,
      ref: null
    },
    decks: [],
    deck: []
  },
  created(){
    decksRef.once('value').then((res) => {
      // console.log('decks:', res.val())
      let currDecks = res.val()
      this.decks = Object.keys(currDecks).map(key => {
        return {
          name: currDecks[key].name,
          ref: key
        }
      })
    }, function (err) {
      console.err(err)
    })
  },
  methods: {
    select(){
      if(this.selectedDeck.name){
        console.log('yes')
        cardsRef.once('value', res => {
          res.forEach(card => {
            console.log(card.val())
          })
        })
      }
    }
  }
})