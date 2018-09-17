let app = new Vue({
  el: '#app',
  data: {
    selectedDeck: {
      name: '',
      key: ''
    },
    decks: [],
    pool: {},
    cards: {}
  },
  created(){

    // GET DECKS
    decksRef.once('value').then( res => {
      // console.log('decks:', res.val())
      let currDecks = res.val()

      res.forEach(deck => {
        this.decks.push({
          name: deck.val().name,
          key: deck.key
        })
      })

    }, err => {
      console.err(err)
    })

    cardsRef.once('value').then(res => {
      res.forEach(card => {

        this.cards[card.key] = {
          num: 1,
          added: false,
          ...card.val()
        }

      })
    })

  },
  methods: {
    select(){
      // if a deck exists, populate it's current card pool
      if (this.selectedDeck.name){
        console.log('get card pool for that deck')
        const key = this.selectedDeck.key
        decksRef.child(key + '/cards')
          .once('value')
          .then(res => {
            res.forEach(card => {

              const key = card.val().key;

              // toggle viewable state for cards already in deck
              this.toggleAdded(card.val().key)
              
              // add to pool UI
              this.$set(this.pool, key, this.cards[key])
              this.pool[key].num = card.val().num
              this.pool[key].self = card.key;

            })
          })
      }
    },
    addToPool(card, ref){
      console.log('adding card to pool', card);
      console.log('addref', ref)
      const key = this.selectedDeck.key

      let cardRef = decksRef.child(key+'/cards').push({
        num: card.num,
        key: ref // key reference to card
      })
      
      cardRef.then(()=>{
        this.$set(this.pool, ref, {
          self: cardRef.key,
          ...card
        })
        this.toggleAdded(ref);
      }).catch(err => {
        console.log(err)
      })
      
    },
    toggleAdded(key){
      this.$set(this.cards[key], 'added', !this.cards[key].added)
    },
    increment(card){
      card.num++
      decksRef.child(`${this.selectedDeck.key}/cards/${card.self}`)
        .update({num: card.num})
    },
    decrement(card){
      if (card.num > 1){
        card.num--
        decksRef.child(`${this.selectedDeck.key}/cards/${card.self}`)
          .update({num: card.num})
      }
    },
    remove(card, key){
      const deck = this.selectedDeck.key
      // remove card from db deck
      decksRef.child(deck + '/cards/' + card.self).remove()
      
      // toggle [cards] view state
      this.cards[key].added = false;
      this.cards[key].num = 1;

      // remove card from pool
      this.$delete(this.pool, key)
    },
  }
})