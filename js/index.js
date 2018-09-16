let app = new Vue({
  el: '#app',
  data: {
    // deckToAdd: '',

    // decks: [],

    // new card
    title: '',
    text: '',
    imgPreview: '',

    // UI
    // selectedDeck: {
    //   name: null,
    //   ref: null
    // },
    // addingDeck: false,
  },
  created: function () {
    decksRef.once('value').then((res) => {
      console.log('decks:', res.val())
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
    submit() {
      console.log('add card')
      // console.log(this.selectedDeck.ref)
      // console.log(this.img)

      let newCard = cardsRef.push()
      newCard.set({
        title: this.title,
        text: this.text,
        img: this.imgPreview,
      })
      console.log('card added!')
      this.clear();
    },
    imgHandle(e) {
      const input = e.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imgPreview = e.target.result;
          console.log('done')
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
    // newDeck(name) {
    //   console.log('add deck:', name)

    //   let newDeckRef = decksRef.push()
    //   newDeckRef.set({
    //     name
    //   })

    //   this.selectedDeck = name;
    //   this.decks.push(name)
    //   this.deckToAdd = '';
    //   this.toggleAdding();
    // },
    clear() {
      this.title= '';
      this.text= '';
      this.imgPreview= '';
    }
  }
})